import Observable from './Observable.js';
import * as AttributeActions from './../constants/AttributeActions.js';
import * as AttributeState from './../validation/AttributeState.js';

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
        this.validation = validation.bind(this);
        this._isPrimary = isPrimary;
        this.state = AttributeState.UNTOUCHED;
    }

    /**
     * Sets value to given value and triggers AttributeActions.FIELD_CHANGED event.
     *
     * @param {*} value
     */
    setValue(value) {
        this.value = value;
        this.state = AttributeState.PENDING;
        this.trigger(AttributeActions.VALUE_CHANGED, this);
        if (!this.hasObserver(AttributeActions.VALUE_CHANGED)) {
            this.state = AttributeState.VALID;
        }
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
        //return this.validation.hasErrors();
        return this.state !== AttributeState.VALID;
    }

    /**
     * Triggers the AttributeActions.VALIDATED event
     */
    validated() {
        this.trigger(AttributeActions.ATTRIBUTE_VALIDATED, this);
    }
}
