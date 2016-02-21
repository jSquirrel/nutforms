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
            let attribute = model.getAttribute(this.getField(rule.condition));
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
            var that = this;
            if (field !== null) {
                return function (args) {
                    // cannot declare with 'let' keyword, otherwise the variable in anonymous function would evaluate as false
                    console.log('var ' + field + '="' + args.value + '";' + that.rewriteCondition(rule.condition));
                    var evalResult = eval('var ' + field + '="' + args.value + '";' + that.rewriteCondition(rule.condition));
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
     * @param {string} expression
     * @returns {?string} field name
     */
    static getField(expression) {
        let fieldName = /[a-zA-Z]+/.exec(expression);
        return fieldName === null && fieldName.length > 0 ? null : fieldName[0];
    }

    /**
     * Rewrites the raw Drools rule condition to a form where it can be evaluated with JavaScript
     *
     * @param {string} condition
     * @returns {string} rewritten condition that can be safely passed to <code>eval()</code> JS function
     */
    static rewriteCondition(condition) {
        let rewritten = condition;
        // rewrite regex matching
        let split = rewritten.split(' ');
        while (split.indexOf('~=') > -1) {  // matches gets rewritten to '~=' in Drools
            let matchesIndex = split.indexOf('~=');
            let regex = split[matchesIndex + 1];
            var regexIndex = matchesIndex + 1;
            while (regex.length > 1 && regex.charAt(regex.length - 1) !== '"') {    // fix regex containing spaces
                regex += ' ' + split[++regexIndex];
            }
            split.length = 3;
            split[matchesIndex + 1] = split[matchesIndex - 1] + ')';    // matches the opening bracket of 'test('
            split[matchesIndex - 1] = regex.replace(/"/g,'/');  // globally replace quotes by slashes (RegExp notation)
            split[matchesIndex] = '.test(';
            rewritten = split.join(' ');
        }
        console.log(rewritten);
        return rewritten;
    }
}
