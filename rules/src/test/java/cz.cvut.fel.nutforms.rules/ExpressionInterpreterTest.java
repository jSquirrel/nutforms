package cz.cvut.fel.nutforms.rules;

import cz.cvut.fel.nutforms.rules.inspection.interpreter.ExpressionInterpreter;
import cz.cvut.fel.nutforms.rules.metamodel.condition.Condition;
import org.junit.Test;

/**
 * Tests the functionality of {@link cz.cvut.fel.nutforms.rules.inspection.interpreter.ExpressionInterpreter}.
 */
public class ExpressionInterpreterTest {

    @Test
    public void testInterpret() {
        ExpressionInterpreter interpreter = new ExpressionInterpreter();
        String expression = "!(A      ||!  (!D  ))||           (E)";
        String expression2 = "password.length() > 5 && password.length() < 20 || age >= 18";
        Condition condition = interpreter.interpret(expression2);
        System.out.println("ExpressionInterpreterTest#testInterpret() ended successfully.");
    }
}
