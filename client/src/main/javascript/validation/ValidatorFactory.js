import * as AttributeActions from './../constants/AttributeActions.js';
import * as ModelActions from './../constants/ModelActions.js';
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
            let fieldNames = this.getFields(rule.condition);
            if (fieldNames.length === 0) {
                return;
            }
            let attributes = [];
            fieldNames.forEach(name => attributes.push(model.getAttribute(name)));
            let validator = this.createFunction(model, attributes, rule, locale);
            if (validator) {
                // toDo: distinguish events
                // toDo: also add validators to Relations
                attributes.forEach(attribute => attribute.listen(AttributeActions.VALUE_CHANGED, validator));   // toDo: change event
            }
        })
    }

    /**
     * Creates a validation function out of given object (rule as JSON)
     *
     * @param {Model} model
     * @param {Array.<Observable>} observables
     * @param {object} rule
     * @param {string} locale
     */
    static createFunction(model, observables, rule, locale) {
        if (rule.hasOwnProperty("condition")) {
            // get the first word, i.e. sequence of letters separated by non-letter
            var that = this;
            return function (args) {
                var declaration = that.declareVariables(model);
                // cannot declare with 'let' keyword, otherwise the variable in anonymous function would evaluate as false
                console.log(declaration + that.rewriteCondition(rule.condition));
                var evalResult = eval(declaration + that.rewriteCondition(rule.condition));
                let url = document.location.origin + '/';
                let apiHandler = new ApiHandler(url, 'admin', '1234');
                apiHandler.fetchLocalization(locale, `rule/${rule.pckg}`).then((data) => {
                    observables.forEach(observable => observable.validation.update({
                        rule: rule.name,
                        errors: evalResult ? null : data[rule.name],
                        info: null
                    }));
                });
                return evalResult;
            }
        }
    }

    /**
     * Returns a string with variable declarations to be used in eval(). Creates declarations of all
     * attributes of the model. ToDo: add relation support
     *
     * @param {Model} model
     * @returns {string} variable declaration string
     */
    static declareVariables(model) {
        var declaration = '';
        Object.keys(model.attributes).forEach(attr => {
            let attribute = model.getAttribute(attr);
            var currentVariable = `var ${attribute.name}="${attribute.value}";`;
            if (attribute.value === null) {  // null errors should be handled in the rule declaration
                currentVariable = currentVariable.replace(/"/g, ''); // do not replace null value with "null"
            }
            declaration += currentVariable;
        });
        return declaration;
    }

    /**
     * Returns field names, to which the function should be bound
     *
     * @param {string} expression
     * @returns {Array.<string>} field names
     */
    static getFields(expression) {
        let fieldNames = [];
        expression.split(/AND|OR|&&|\|\|/).forEach(part => {
            let fieldName = /[a-zA-Z0-9]+/.exec(part);
            if (fieldName !== null && fieldName.length > 0 && fieldNames.indexOf(fieldName[0]) === -1) {
                fieldNames.push(fieldName[0]);
            }
        });
        return fieldNames;
    }

    /**
     * Rewrites the raw Drools rule condition to a form where it can be evaluated with JavaScript
     *
     * @param {string} condition
     * @returns {string} rewritten condition that can be safely passed to <code>eval()</code> JS function
     */
    static rewriteCondition(condition) {
        let rewritten = condition
            .replace(/AND/g, '&&')
            .replace(/OR/g, '||')
            .replace(/==/g, '===')
            .replace(/!=/g, '!==');
        // rewrite regex matching
        while (rewritten.split(' ').indexOf('~=') > -1) {  // matches gets rewritten to '~=' in Drools
            let split = rewritten.split(' ');
            let matchesIndex = split.indexOf('~=');
            let regex = split[matchesIndex + 1];
            var regexIndex = matchesIndex + 1;
            let skip = 0;
            for (; regex.length > 1 && regex.charAt(regex.length - 1) !== '"'; ++skip) {    // fix regex containing spaces
                regex += ' ' + split[++regexIndex];
            }
            let rest = split.slice(3 + skip, split.length);
            Array.prototype.splice.apply(split, [3, split.length].concat(rest));    // split.length is used to ensure that the array is filled whole (and can be shortened after this)
            //split.length = 3;   // toDo: fix for composite rules (and/or)
            split[matchesIndex + 1] = split[matchesIndex - 1] + ')';    // matches the opening bracket of 'test('
            split[matchesIndex - 1] = regex.replace(/"/g, '/');  // globally replace quotes by slashes (RegExp notation)
            split[matchesIndex] = '.test(';
            rewritten = split.join(' ');
        }
        return rewritten;
    }
}
