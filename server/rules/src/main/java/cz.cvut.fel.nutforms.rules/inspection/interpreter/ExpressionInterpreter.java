package cz.cvut.fel.nutforms.rules.inspection.interpreter;

import cz.cvut.fel.nutforms.rules.metamodel.condition.Condition;
import cz.cvut.fel.nutforms.rules.metamodel.condition.Eval;
import cz.cvut.fel.nutforms.rules.metamodel.condition.Group;

import java.util.Stack;

/**
 * Helper class that interprets expression string and creates a tree of {@link Condition} elements according to
 * operator priority and brackets.
 */
public class ExpressionInterpreter {

    /**
     * Interprets given string and builds respective {@link Condition} tree.
     *
     * @param expression
     * @return
     */
    public Condition interpret(String expression) {
        int bracketCount = 0;   // opening bracket count, used for distinguishing top level conditions
        int conditionStartPos = 0;  // starting position of current condition
        Group.Operator currentOperator = null;
        char previous = 0;  // previous char, used for validating doubled logical operators
        boolean negated = false;   // the next condition should be negated, i. e. is preceded by "!"
        boolean methodCall = false; // currently within method parameter brackets
        Stack<ExpressionElement> stack = new Stack<>(); // stack for prefix notation parsing

        for (int i = 0; i < expression.length(); ++i) {
            // top level conditions are created in this layer, nested ones are build recursively
            switch (expression.charAt(i)) {
                case '(':
                    // test if the opening bracket indicates a method call (i. e. previous character ignoring whitespace
                    // is a letter)
                    methodCall = expression.substring(0, i).replaceAll(" ", "").matches(".*[a-zA-Z]*$");
                    if (bracketCount++ == 0 && !methodCall) {
                        conditionStartPos = i + 1;  // should be safe, Drools should validate this before compilation
                    }
                    break;
                case ')':
                    if (--bracketCount == 0) {
                        if (!methodCall) {
                            stack.push(new ExpressionCondition(interpret(expression.substring(conditionStartPos, i).trim()), negated));
                            negated = false;
                            conditionStartPos = i + 1;
                            if (currentOperator != null) {
                                stack.push(new ExpressionOperator(currentOperator));
                                currentOperator = null;
                            }
                        } else {
                            methodCall = false;
                        }
                    }
                    break;
                case '&':
                    if (!methodCall && bracketCount == 0) {
                        if (previous == '&') {
                            if (i - 1 >= conditionStartPos && expression.substring(conditionStartPos, i - 1).trim().length() > 0) {
                                stack.push(new ExpressionCondition(interpret(expression.substring(conditionStartPos, i - 1).trim()), negated));
                                negated = false;
                                conditionStartPos = i + 1;
                            }
                            if (currentOperator != null) {
                                stack.push(new ExpressionOperator(currentOperator));
                            }
                            currentOperator = Group.Operator.AND;
                        } else {
                            previous = '&';
                        }
                    }
                    break;
                case '|':
                    if (!methodCall && bracketCount == 0) {
                        if (previous == '|') {
                            if (i - 1 >= conditionStartPos && expression.substring(conditionStartPos, i - 1).trim().length() > 0) {
                                stack.push(new ExpressionCondition(interpret(expression.substring(conditionStartPos, i - 1).trim()), negated));
                                negated = false;
                                conditionStartPos = i + 1;
                            }
                            if (currentOperator != null) {
                                stack.push(new ExpressionOperator(currentOperator));
                            }
                            currentOperator = Group.Operator.OR;
                        } else {
                            previous = '|';
                        }
                    }
                    break;
                case ',':
                    if (!methodCall && bracketCount == 0 && i - 1 >= conditionStartPos && expression.substring(conditionStartPos, i - 1).trim().length() > 0) {
                        stack.push(new ExpressionCondition(interpret(expression.substring(conditionStartPos, i).trim()), negated));
                        negated = false;
                        if (currentOperator != null) {
                            stack.push(new ExpressionOperator(currentOperator));
                        }
                        currentOperator = Group.Operator.COMMA;
                        conditionStartPos = i + 1;
                    }
                    break;
                case '!':
                    if (!methodCall && bracketCount == 0) {
                        negated = !negated;
                    }
                    break;
                default:
                    break;
            }
        }

        // the first opening bracket is omitted (if it was present), so the last one should be omitted as well
        if (conditionStartPos < expression.length()) {
            String expressionSubstring = expression.substring(conditionStartPos,
                    expression.endsWith(")") && !areBracketsEven(expression) ? expression.length() - 1 : expression.length()).trim().replaceAll("!", "");
            // is the condition simple (i. e. does not contain grouping operators)
            if (expressionSubstring.split("[&|,]").length <= 1) {
                Eval eval = new Eval(expressionSubstring);
                stack.push(new ExpressionCondition(eval, negated));
            } else {
                stack.push(new ExpressionCondition(interpret(expressionSubstring), negated));
            }
        }
        if (currentOperator != null) {
            stack.push(new ExpressionOperator(currentOperator));
        }
        return interpretStack(stack);
    }


    /**
     * Parses the content of the stack of prefix notation conditions into one complex {@link Condition}
     *
     * @param stack
     * @return
     */
    private Condition interpretStack(Stack<ExpressionElement> stack) {
        Condition condition = null;
        while (!stack.empty()) {
            ExpressionElement element = stack.pop();
            if (element.getType() == ElementType.OPERATOR) {
                condition = handleOperator(stack, (ExpressionOperator) element);
            } else {
                condition = ((ExpressionCondition) element).getCondition();
            }
        }
        return condition;
    }

    /**
     * Handles an encountered operator and creates a {@link Group} out of it.
     *
     * @param stack    stack of {@link ExpressionElement}s
     * @param operator current operator popped from stack
     * @return {@link Group} representing the operator
     */
    private Group handleOperator(Stack<ExpressionElement> stack, ExpressionOperator operator) {
        ExpressionElement top = stack.pop();
        Condition right = top.getType() == ElementType.CONDITION ? ((ExpressionCondition) top).getCondition() :
                handleOperator(stack, (ExpressionOperator) top);
        top = stack.pop();
        Condition left = top.getType() == ElementType.CONDITION ? ((ExpressionCondition) top).getCondition() :
                handleOperator(stack, (ExpressionOperator) top);
        return new Group(left, right, operator.getOperator());
    }

    /**
     * Returns true, if the amount of opening and closing brackets within given string is equal
     *
     * @param s
     * @return
     */
    private boolean areBracketsEven(String s) {
        int opening = 0,closing = 0;
        for (int i = 0; i < s.length(); ++i) {
            switch (s.charAt(i)) {
                case '(':
                    ++opening;
                    break;
                case ')':
                    ++closing;
                    break;
            }
        }
        return opening == closing;
    }
}
