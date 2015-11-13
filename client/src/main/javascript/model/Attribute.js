import Observable from './Observable.js';
import * as AttributeActions from './../constants/AttributeActions.js';

export default class Attribute extends Observable {

    /**
     * Attribute constructor.
     *
     * @param {string} name
     * @param {string} type
     * @param {*} value
     */
    constructor(name, type, value) {
        super();
        this.name = name;
        this.type = type;
        this.value = value;
    }

    /**
     * Sets value to given value and triggers AttributeActions.FIELD_CHANGED event.
     *
     * @param {*} value
     */
    setValue(value) {
        this.value = value;
        this.trigger(AttributeActions.FIELD_CHANGED, this);
    }

}
