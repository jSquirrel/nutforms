import * as AttributeActions from './../constants/AttributeActions.js';
import ApiHandler from '../api/ApiHandler.js';

export default class ValidatorFactory {

    /**
     * Adds validation observers to suitable field events of the model
     *
     * @param {Model} model
     * @param {object} rules
     * @param {string} locale
     */
    static addObservers(model, rules, locale) {
        rules.forEach(rule => {
            let fieldName = this.getField(rule.condition);
            if (fieldName == null) {
                return;
            }
            let attribute = model.getAttribute(fieldName);
            let validator = this.createFunction(attribute, rule, locale);
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
     * @param {Attribute} attribute
     * @param {object} rule
     * @param {string} locale
     */
    static createFunction(attribute, rule, locale) {
        if (rule.hasOwnProperty("condition")) {
            // toDo: implement function creation for multiple constraints and multiple fields
            // get the first word, i.e. sequence of letters separated by non-letter
            let field = this.getField(rule.condition);
            if (field !== null) {
                return function (args) {
                    // cannot declare with 'let' keyword, otherwise the variable in anonymous function would evaluate as false
                    var evalResult = eval('var ' + field + '="' + args.value + '";' + rule.condition);
                    let url = document.location.origin + '/';
                    let apiHandler = new ApiHandler(url, 'admin', '1234');
                    apiHandler.fetchLocalization(locale, `rule/${rule.pckg}`).then((data) => {
                        console.log(data);
                        attribute.trigger(AttributeActions.ATTRIBUTE_VALIDATED, {
                            validation: {
                                errors: evalResult ? [] : [data[rule.name]],
                                info: []
                            }
                        });
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
