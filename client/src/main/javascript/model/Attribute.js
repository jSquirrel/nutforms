import Observable from './Observable.js';
import * as AttributeActions from './../constants/AttributeActions.js';

export default class Attribute extends Observable {

    /**
     * Attribute constructor.
     *
     * @param {string} name
     * @param {string} type
     * @param {*} value
     * @param {AttributeLocalization} localization
     * @param {Validation} validation
     * @param {boolean} isPrimary
     */
    constructor(name, type, value, localization, validation, isPrimary) {
        super();
        this.name = name;
        this.type = type;
        this.value = value;
        this.localization = localization;
        this.validation = validation;
        this._isPrimary = isPrimary;
    }

    /**
     * Sets value to given value and triggers AttributeActions.FIELD_CHANGED event.
     *
     * @param {*} value
     */
    setValue(value) {
        this.value = value;
        this.trigger(AttributeActions.VALUE_CHANGED, this);
    }

    /**
     * Returns localized form label for this Attribute.
     *
     * @returns {string}
     */
    getFormLabel() {
        return this.localization.formLabel;
    }

    /**
     * Returns TRUE if the attribute is primary, FALSE if not.
     *
     * @returns {boolean}
     */
    isPrimary() {
        return this._isPrimary;
    }

    /**
     * Returns <code>true</code> if the value of this attribute is not valid, <code>false</code> if valid
     *
     * @returns {boolean}
     */
    hasErrors() {
        return this.validation.hasErrors();
    }
}
