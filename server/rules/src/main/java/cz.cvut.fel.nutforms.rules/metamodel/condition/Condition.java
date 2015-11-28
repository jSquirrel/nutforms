package cz.cvut.fel.nutforms.rules.metamodel.condition;

/**
 * Abstract implementation of one condition of a business rule. A business rule may have one or more conditions,
 * that can be connected with logical operators.
 */
public abstract class Condition {

    boolean negated = false;

    public boolean isNegated() {
        return negated;
    }

    public void setNegated(boolean negated) {
        this.negated = negated;
    }
}
