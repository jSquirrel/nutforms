export default class ModelLocalization {

    /**
     * ModelLocalization constructor.
     *
     * @param {string} formLabel
     * @param {string} submitValue
     * @param {string} submitSucceededValue
     * @param {string} submitFailedValue
     */
    constructor(formLabel, submitValue, submitSucceededValue, submitFailedValue) {
        this.formLabel = formLabel;
        this.submitValue = submitValue;
        this.submitSucceededValue = submitSucceededValue;
        this.submitFailedValue = submitFailedValue;
    }

}
