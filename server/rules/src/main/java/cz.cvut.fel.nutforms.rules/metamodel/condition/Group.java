package cz.cvut.fel.nutforms.rules.metamodel.condition;

/**
 * Implementation of logical operators "||", "&&" and ","
 */
public class Group extends Condition {

    private Condition left;
    private Condition right;
    private Operator operator;

    public Group() {
    }

    public Group(Condition left, Condition right, Operator operator) {
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    /**
     * Get left {@link Condition} of the operator
     *
     * @return
     */
    public Condition getLeft() {
        return left;
    }

    public void setLeft(Condition left) {
        this.left = left;
    }

    /**
     * Get right {@link Condition} of the operator
     *
     * @return
     */
    public Condition getRight() {
        return right;
    }

    public void setRight(Condition right) {
        this.right = right;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public enum Operator {
        AND ("&&"),
        OR ("||"),
        COMMA (",");

        private final String value;

        Operator(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }
}
