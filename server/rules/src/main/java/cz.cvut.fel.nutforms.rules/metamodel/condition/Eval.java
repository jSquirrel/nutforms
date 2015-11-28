package cz.cvut.fel.nutforms.rules.metamodel.condition;

/**
 * Custom implementation of {@link org.drools.core.rule.EvalCondition} condition.
 */
public class Eval extends Condition {

    private String constraint;

    public Eval(String constraint) {
        this.constraint = constraint;
    }

    public String getConstraint() {
        return constraint;
    }

    public void setConstraint(String constraint) {
        this.constraint = constraint;
    }
}
