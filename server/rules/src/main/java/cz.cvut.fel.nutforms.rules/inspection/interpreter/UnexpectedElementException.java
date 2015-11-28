package cz.cvut.fel.nutforms.rules.inspection.interpreter;

/**
 * Thrown when unexpected element is encountered in stack (e. g. two {@link ExpressionCondition}s do not follow
 * {@link ExpressionOperator})
 */
public class UnexpectedElementException extends RuntimeException {

    public UnexpectedElementException() {
    }

    public UnexpectedElementException(String message) {
        super(message);
    }

    public UnexpectedElementException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnexpectedElementException(Throwable cause) {
        super(cause);
    }
}
