package cz.cvut.fel.nutforms.rules.inspection;

import cz.cvut.fel.nutforms.rules.metamodel.Declaration;
import cz.cvut.fel.nutforms.rules.metamodel.Rule;
import org.drools.core.definitions.InternalKnowledgePackage;
import org.drools.core.definitions.rule.impl.RuleImpl;
import org.drools.core.impl.KnowledgeBaseImpl;
import org.drools.core.rule.EvalCondition;
import org.drools.core.rule.Function;
import org.drools.core.rule.GroupElement;
import org.drools.core.rule.RuleConditionElement;
import org.drools.core.rule.constraint.MvelConstraint;
import org.drools.core.spi.Constraint;
import org.drools.core.spi.InternalReadAccessor;
import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.definition.KiePackage;
import org.kie.api.runtime.KieContainer;

import java.lang.reflect.Field;
import java.util.*;

/**
 * Inspects Drools rules and creates {@link Rule} objects from them.
 */
public class Inspector {

    /**
     * Inspects a specific Drools rule and creates a {@link Rule} object from it.
     *
     * @param droolsRule
     * @return
     */
    public Rule inspectRule(RuleImpl droolsRule) {
        Rule rule = new Rule();
        rule.setName(droolsRule.getName());
        rule.setPckg(droolsRule.getPackageName());

        // set Globals and Functions
//        KieServices.Factory.get().getKieClasspathContainer().getKieBase("userbase");
        try {
            KieContainer kieContainer = KieServices.Factory.get().getKieClasspathContainer();
            Field kBases = kieContainer.getClass().getDeclaredField("kBases");
            kBases.setAccessible(true);
            for (Object o : ((Map) kBases.get(kieContainer)).values()) {
                KnowledgeBaseImpl base = (KnowledgeBaseImpl) o;
                InternalKnowledgePackage knowledgePackage = base.getPackage(droolsRule.getPackageName());
                if (knowledgePackage != null) {
                    for (Map.Entry<String, String> entry : knowledgePackage.getGlobals().entrySet()) {
                        Declaration declaration = new Declaration();
                        declaration.setName(entry.getKey());
                        declaration.setType(entry.getValue());
                        rule.getGlobals().put(entry.getKey(), declaration);
                    }
                    for (Function function : knowledgePackage.getFunctions().values()) {
                        // toDo: test functionality
                        rule.getFunctions().add(function.getName());
                    }
                }
            }
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

        // create Conditions
        GroupElement.Type type = droolsRule.getLhs().getType();
        StringJoiner joiner = new StringJoiner(String.format(" %s ", type));
        for (RuleConditionElement conditionElement : droolsRule.getLhs().getChildren()) {
            //toDo: create a factory for this
            StringBuilder conditionBuilder = new StringBuilder();
            if (conditionElement instanceof org.drools.core.rule.Pattern) {
                if (((org.drools.core.rule.Pattern) conditionElement).getConstraints().size() > 0) {
                    StringJoiner subJoiner = new StringJoiner(" AND ");
                    for (Constraint constraint : ((org.drools.core.rule.Pattern) conditionElement).getConstraints()) {
                        if (constraint instanceof MvelConstraint) {
                            subJoiner.add(((MvelConstraint) constraint).getExpression());
                        } else {
                            throw new IllegalArgumentException("Constraint type not supported: " +
                                    constraint.getClass().getName());
                        }
                    }
                    if (subJoiner.length() > 0) {
                        conditionBuilder.append(subJoiner.toString());
                    }
                }
            } else if (conditionElement instanceof EvalCondition) {
                conditionBuilder.append(((EvalCondition) conditionElement).getEvalExpression().toString());
            } else {
                throw new IllegalArgumentException("Condition class not supported: " +
                        conditionElement.getClass().getName());
            }
            if (conditionBuilder.length() > 0) {
                joiner.add(conditionBuilder.toString());
            }

            // add Declarations
            for (org.drools.core.rule.Declaration declaration : droolsRule.getDeclarations().values()) {
                Declaration varDeclaration = new Declaration();
                varDeclaration.setName(declaration.getIdentifier());
                varDeclaration.setType(declaration.getTypeName());
                try {
                    InternalReadAccessor extractor = declaration.getExtractor();
                    Field className = extractor.getClass().getDeclaredField("className");
                    className.setAccessible(true);
                    varDeclaration.setEntity((String) className.get(extractor));
                    Field fieldName = extractor.getClass().getDeclaredField("fieldName");
                    fieldName.setAccessible(true);
                    varDeclaration.setField((String) fieldName.get(extractor));
                } catch (NoSuchFieldException e) {
                    // if the declaration is not a field of an entity, null will be left as a value for "entity"
                    // and "field", which is ok, so this exception can be ignored
                } catch (IllegalAccessException e) {
                    // should never be encountered, both fields are #setAccessible(true)
                    e.printStackTrace();
                }
                rule.getDeclarations().put(declaration.getIdentifier(), varDeclaration);
            }
        }
        rule.setCondition(joiner.toString());
        return rule;
    }

    /**
     * Inspects all rules in given {@link KiePackage} and returns a set of {@link Rule}s created from Drools
     * {@link org.kie.api.definition.rule.Rule}s in the package (one package == single *.drl file)
     *
     * @param kiePackage a package to inspect rules from
     * @return set of created {@link Rule}s
     */
    public Set<Rule> inspectPackage(KiePackage kiePackage) {
        Set<Rule> rules = new HashSet<>();
        if (kiePackage.getRules().size() > 0) {
            for (org.kie.api.definition.rule.Rule rule : kiePackage.getRules()) {
                rules.add(inspectRule((RuleImpl) rule));
            }
        }
        return rules;
    }

    /**
     * Inspects packages in given {@link KieBase} and returns a map, where key is package name and
     * value is a set of {@link Rule}s from that package.
     *
     * @param kieBase
     * @return
     */
    public Map<String, Set<Rule>> inspectBase(KieBase kieBase) {
        Map<String, Set<Rule>> rulesMap = new HashMap<>();
        if (kieBase.getKiePackages().size() > 0) {
            for (KiePackage kiePackage : kieBase.getKiePackages()) {
                Set<Rule> rules = inspectPackage(kiePackage);
                if (rules.size() > 0) {
                    rulesMap.put(kiePackage.getName(), rules);
                }
            }
        }
        return rulesMap;
    }

//    /**
//     * Creates a {@link Condition} from given Drools {@link ConditionalElement} object. If the condition contains
//     * logical grouping elements, groups them into {@link Group}.
//     *
//     * @param conditionElement
//     * @return
//     */
//    private Condition createCondition(RuleConditionElement conditionElement) {
//        Condition condition;
//        if (conditionElement instanceof org.drools.core.rule.Pattern) {
//            condition = new Pattern();
//            for (Constraint constraint : ((org.drools.core.rule.Pattern) conditionElement).getConstraints()) {
//                if (constraint instanceof MvelConstraint) {
//                    ((Pattern) condition).getConstraints().add(((MvelConstraint) constraint).getExpression());
//                } else {
//                    throw new IllegalArgumentException("Constraint type not supported: " +
//                            constraint.getClass().getName());
//                }
//            }
//        } else if (conditionElement instanceof EvalCondition) {
//            condition = new Eval();
//            ((Eval) condition).setConstraint(((EvalCondition) conditionElement).getEvalExpression().toString());
//        } else {
//            throw new IllegalArgumentException("Condition class not supported: " +
//                    conditionElement.getClass().getName());
//        }
//    }
//
//    /**
//     * Creates a {@link Group} condition if given constraint contains logical operators "&&", "||", or ",";
//     *
//     * @param constraint
//     * @return
//     */
//    private Condition createGroupCondition(Constraint constraint) {
//        if (constraint instanceof MvelConstraint) {
//            String expression = ((MvelConstraint) constraint).getExpression();
//            Group group = new Group();
//            if (expression.contains("||")) {
//
//            } else if (expression.contains("&&")) {
//
//            } else if (expression.contains(",")) {
//
//            } else {
//                Pattern pattern = new Pattern();
//                pattern.getConstraints().add(expression);
//                return pattern;
//            }
//        } else {
//            throw new IllegalArgumentException("Constraint type not supported: " +
//                    constraint.getClass().getName());
//        }
//    }
}
