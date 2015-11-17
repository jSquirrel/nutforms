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
     */
    constructor(name, type, value, localization) {
        super();
        this.name = name;
        this.type = type;
        this.value = value;
        this.localization = localization;
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

}
