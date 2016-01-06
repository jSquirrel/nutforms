import * as AttributeActions from './../constants/AttributeActions.js';

export default class ValidatorFactory {

    /**
     * Adds validation observers to suitable field events of the model
     *
     * @param {Model} model
     * @param {object} rules
     */
    static addObservers(model, rules) {
        rules.forEach(rule => {
            let attribute = model.getAttribute(this.getField(rule.condition));
            let validator = this.createFunction(attribute, rule);
            if (validator) {
                // toDo: distinguish events
                // toDo: also add validators to Relations
                attribute.listen(AttributeActions.VALUE_CHANGED, validator);
            }
        })
    }

    /**
     * Creates a validation function out of given object (rule as JSON)
     *
     * @param {Attribute} model
     * @param {object} rule
     */
    static createFunction(attribute, rule) {
        if (rule.hasOwnProperty("condition")) {
            // toDo: implement function creation for multiple constraints and multiple fields
            // get the first word, i.e. sequence of letters separated by non-letter
            let field = this.getField(rule.condition);
            if (field !== null) {
                return function (args) {
                    // cannot declare with 'let' keyword, otherwise the variable in anonymous function would evaluate as false
                    var evalResult = eval('var ' + field + '="' + args.value + '";' + rule.condition);
                    console.log(evalResult);
                    // toDo: Do not write feedback directly, use Rule FQN as translation key
                    attribute.trigger(AttributeActions.ATTRIBUTE_VALIDATED, {
                        validation: {
                            errors: evalResult ? [] : [`${rule.pckg}.${rule.name}`],
                            info: []
                        }
                    });
                    return evalResult;
                }
            }
        }
    }

    /**
     * Returns field name, to which the function should be bound
     *
     * @param expression
     */
    static getField(expression) {
        return /[a-zA-Z]+/.exec(expression);
    }
}
