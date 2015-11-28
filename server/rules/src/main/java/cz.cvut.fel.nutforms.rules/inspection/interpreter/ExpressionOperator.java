package cz.cvut.fel.nutforms.rules.inspection.interpreter;

import cz.cvut.fel.nutforms.rules.metamodel.condition.Group;

/**
 * Represents "&&", "||" and "," logical operators for stack usage.
 */
public class ExpressionOperator implements ExpressionElement {

    private Group.Operator operator;

    public ExpressionOperator(Group.Operator operator) {
        this.operator = operator;
    }

    @Override
    public ElementType getType() {
        return ElementType.OPERATOR;
    }

    public Group.Operator getOperator() {
        return operator;
    }

    public void setOperator(Group.Operator operator) {
        this.operator = operator;
    }
}
