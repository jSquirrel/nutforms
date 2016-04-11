/**
 * Created by Ondřej Kratochvíl on 11.4.16.
 */
export default class ContextRules {

    /**
     * ContextRules constructor
     *
     * @param {Array.<object>} contextRules array of JSON objects with server-parsed rule declarations
     * @param {string} context
     */
    constructor(contextRules, context) {
        this.rules = contextRules;
        this.context = context;
    }

    // toDo: rules distinguishing should be done differently, let this be a proof of concept

    /**
     *  Returns an object containing only validation rules for this context
     *  @returns {Array.<object>} validation rules
     */
    validationRules() {
        let validationRules = [];
        this.rules.forEach(rule => {
            if (typeof rule.name !== 'undefined' && rule.name.indexOf('[Security]') === -1) {
                validationRules.push(rule);
            }
        });
        return validationRules;
    }

    /**
     *  Returns an object containing only security rules for this context
     *  @returns {Array.<object>} security rules
     */
    securityRules() {
        let securityRules = [];
        this.rules.forEach(rule => {
            if (typeof rule.name !== 'undefined' && rule.name.indexOf('[Security]') > -1) {
                securityRules.push(rule);
            }
        });
        return securityRules;
    }
}