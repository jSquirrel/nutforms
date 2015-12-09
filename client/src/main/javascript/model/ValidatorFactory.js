export default class ValidatorFactory {

    /**
     * Creates a validation function out of given object (rule as JSON)
     *
     * @param {object} rule
     */
    static createFunction(rule) {
        if (rule.hasOwnProperty("condition")) {

        }
        return function () {
        };
    }
}
