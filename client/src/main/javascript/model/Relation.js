import Attribute from './Attribute';


export default class Relation extends Attribute {

    /**
     * Relation constructor.
     *
     * @param {string} name
     * @param {string} type
     * @param {*} value
     * @param {string} targetClass
     * @param {AttributeLocalization} localization
     */
    constructor(name, type, value, targetClass, localization) {
        super(name, type, value, localization, false);
        this.targetClass = targetClass;
    }

    /**
     * Returns localized form label for this Attribute.
     *
     * @returns {string}
     */
    getFormLabel() {
        return this.localization.formLabel;
    }

}
