import * as AttributeActions from './../constants/AttributeActions.js';
import * as ModelActions from './../constants/ModelActions.js';
import * as AttributeState from './AttributeState.js';
import ApiHandler from '../api/ApiHandler.js';
import CollectionHelper from './../helper/CollectionHelper.js';

// toDo: rename to RuleFactory/RuleWeaver
export default class ValidatorFactory {

    // toDo: move some methods to ValidationHelper

    /**
     * Adds validation observers to suitable field events of the model
     *
     * @param {Model} model
     * @param {Array.<object>} rules
     * @param {string} locale
     */
    static addObservers(model, rules, locale) {
        rules.forEach(rule => {
            if (rule.hasOwnProperty("condition")) {
                let fieldNames = this.getFields(rule.condition);
                if (fieldNames.length === 0) {
                    return;
                }
                let isModelRelated = this.isModelRelated(rule.condition);
                let attributes = [];
                fieldNames.forEach(name => attributes.push(model.getAttribute(name)));
                let validator = this.createFunction(model, isModelRelated ? [model] : attributes, rule, locale);
                if (validator) {
                    // toDo: distinguish events
                    // toDo: also add validators to Relations
                    if (isModelRelated) {
                        model.listen(ModelActions.SUBMITTED, validator);
                    } else {
                        attributes.forEach(attribute => attribute.listen(AttributeActions.VALUE_CHANGED, validator));
                    }
                }
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
        // get the first word, i.e. sequence of letters separated by non-letter
        var that = this;
        return function (args) {
            var declaration = that.declareVariables(model);
            // cannot declare with 'let' keyword, otherwise the variable in anonymous function would evaluate as false
            console.log(declaration + that.rewriteCondition(rule.condition));
            var evalResult = eval(declaration + that.rewriteCondition(rule.condition));
            that.updateAttributeStatus(args, observables, !!evalResult);
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

    /**
     * Evaluates given security rules and disables appropriate fields for violated conditions
     *
     * @param {Array.<object>} securityRules security rules for current context
     * @param {object} dom
     */
    static disableFields(securityRules, dom) {
        securityRules.forEach(rule => {
            let declarations = [];
            Object.keys(rule.declarations).forEach(declaration => declarations.push(rule.declarations[declaration].field));
            if (!eval(rule.condition)) {
                declarations.forEach(declaration => {
                    let elements = dom.getElementsByName(declaration);
                    for (let i = 0; i < elements.length; ++i) {
                        elements[i].disabled = true;
                    }
                });
            }
        });
        return dom;
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
            split[matchesIndex + 1] = split[matchesIndex - 1] + ')';    // matches the opening bracket of 'test('
            split[matchesIndex - 1] = regex.replace(/"/g, '/');  // globally replace quotes by slashes (RegExp notation)
            split[matchesIndex] = '.test(';
            rewritten = split.join(' ');
        }
        return rewritten;
    }

    /**
     * Returns <code>true</code> if the rule with given condition should be treated as a model-related rule, instead
     * of being bound to individual fields
     *
     * @param {string} condition condition of the rule
     * @returns {boolean} true if the rule is model-related
     */
    static isModelRelated(condition) {
        return condition.indexOf('||') > -1 || condition.indexOf('OR') > -1;
    }

    /**
     * Updates the AttributeState of given attributes according to the result of validation function
     *
     * @param {Observable} observable component on which the function was triggered
     * @param {Array.<Attribute>} attributes all attributes related to current rule
     * @param {boolean} valid <code>true</code> if the rule was evaluated as true with current form values
     */
    static updateAttributeStatus(observable, attributes, valid) {
        // is state attribute defined - filters out Model related rules, all fields are
        if (attributes.length === 1 && !!attributes[0].state) {
            console.log(`${attributes[0].name} state changing from ${attributes[0].state}...`);
            if (attributes[0].state !== AttributeState.INVALID) {   // if it's invalid, keep it that way (every change should set state to PENDING)
                attributes[0].state = valid ? AttributeState.VALID : AttributeState.INVALID;
            }
            console.log(`...to ${attributes[0].state}`)
        } else if (attributes.length > 1) { // multi-field rule
            // untouched attributes
            let indexes = CollectionHelper.findWithAttribute(attributes, 'state', AttributeState.UNTOUCHED);
            // are there no untouched fields, or the only untouched is current attribute (trigger of this event)
            let isAloneUntouched = indexes.length === 0 || (indexes.length === 1 && indexes[0] === (attributes.indexOf(observable)));
            attributes.forEach(attr => {
                // if the rule is triggered on Model, name is undefined -> always false
                // Model rules are triggered only on submit, thus attributes should not have status BLOCKED after this
                if (isAloneUntouched) { // set valid/invalid to all fields...
                    console.log(`${attr.name} state changing from ${attr.state}...`);
                    if (attr.state !== AttributeState.INVALID) {
                        attr.state = valid ? AttributeState.VALID : AttributeState.INVALID;
                    }
                    console.log(`...to ${attr.state}`);
                } else if (attr.name === observable.name) { // ...or set current to blocked
                    console.log(`${attr.name} state changed from ${attr.state} to BLOCKED`);
                    attr.state = AttributeState.BLOCKED;
                }
            })
        }
    }
}
