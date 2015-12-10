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
            let validator = this.createFunction(rule);
            if (validator) {
                // toDo: distinguish events
                // toDo: also add validators to Relations
                model.getAttribute(this.getField(rule.condition)).listen(AttributeActions.VALUE_CHANGED, validator);
            }
        })
    }

    /**
     * Creates a validation function out of given object (rule as JSON)
     *
     * @param {object} rule
     */
    static createFunction(rule) {
        if (rule.hasOwnProperty("condition")) {
            // toDo: implement function creation for multiple constraints and multiple fields
            // get the first word, i.e. sequence of letters separated by non-letter
            let field = this.getField(rule.condition);
            if (field !== null) {
                return function (args) {
                    console.log(eval('var ' + field + '="' + args.value + '";' + rule.condition));
                    return eval('var ' + field + '="' + args.value + '";' + rule.condition);
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
