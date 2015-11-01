package cz.cvut.fel.nutforms.rules;

import cz.cvut.fel.nutforms.rules.inspection.Inspector;
import org.drools.core.base.mvel.MVELCompilationUnit;
import org.drools.core.definitions.rule.impl.RuleImpl;
import org.drools.core.rule.Pattern;
import org.drools.core.rule.RuleConditionElement;
import org.drools.core.rule.constraint.MvelConstraint;
import org.drools.core.spi.Constraint;
import org.junit.Before;
import org.junit.Test;
import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.definition.KiePackage;
import org.kie.api.definition.rule.Rule;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

/**
 * Rules model inspection test.
 */
public class RulesInspectionTest {

    private StatelessKieSession kieSession;

    @Before
    public void setUp() throws Exception {
        // KieSession creation
        KieServices kieServices = KieServices.Factory.get();
        KieContainer kieContainer = kieServices.getKieClasspathContainer();
        // Specific session will be created here
        kieSession = kieContainer.newStatelessKieSession("accountsession");
        kieSession.setGlobal("status", "verified");
    }

    @Test
    public void inspectUserEntityRules() {
        Collection<KiePackage> kiePackages = kieSession.getKieBase().getKiePackages();
        for (KiePackage kiePackage : kiePackages) {
            if (kiePackage.getRules().size() > 0) {
                System.out.println(kiePackage.getRules().size() + " rule(s) found in package " + kiePackage.getName() + ":");
                for (Rule rule : kiePackage.getRules()) {
                    inspectRule((RuleImpl) rule);
                    System.out.println();
                }
            }
        }
    }

    /**
     * Tests functionality of {@link Inspector#inspectBase(KieBase)}
     */
    @Test
    public void testInspectRule() {
        Inspector inspector = new Inspector();
        Map<String, Set<cz.cvut.fel.nutforms.rules.metamodel.Rule>> rules = inspector.inspectBase(kieSession.getKieBase());
        // toDo: add some asserts
    }

    /**
     * Prints rule content specified in Drools
     *
     * @param rule rule to be inspected
     * @deprecated Not type safe, works only for {@link Pattern} type rules. Use {@link Inspector}
     * instead
     */
    private void inspectRule(RuleImpl rule) {
        System.out.println("\tName: ");
        System.out.println("\t\t" + rule.getName());
        System.out.println("\tDeclarations: ");
        for (String s : rule.getDeclarations().keySet()) {
            System.out.println("\t\t" + s + " [" + rule.getDeclaration(s).getBoxedTypeName() + "]");
        }
        System.out.println("\tConstraints: ");
        for (RuleConditionElement ruleConditionElement : rule.getLhs().getChildren()) {
            for (Constraint constraint : ((Pattern) ruleConditionElement).getConstraints()) {
                //toDo: use reflection to get class name instead of toString
                System.out.println("\t\t" + "Object type: " + ((Pattern) ruleConditionElement).getObjectType());
                System.out.println("\t\t" + ((MvelConstraint) constraint).getExpression());
            }
        }
        if (rule.getConsequence() != null) {
            System.out.println("\tConsequence: ");
            try {
                Field unit = rule.getConsequence().getClass().getDeclaredField("unit");
                unit.setAccessible(true);
                //is reflection needed?
                System.out.println("\t\t" + ((MVELCompilationUnit) unit.get(rule.getConsequence())).getExpression());
            } catch (NoSuchFieldException e) {
                //toDo: show more user friendly message, log stack trace (add slf4j dependency)
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
