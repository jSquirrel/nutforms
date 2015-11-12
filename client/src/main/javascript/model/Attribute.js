import reactMixin from 'react-mixin';
import Observable from './Observable.js';


export default class Attribute {

    /**
     * Attribute constructor.
     *
     * @param {string} name
     * @param {string} type
     * @param {*} value
     */
    constructor(name, type, value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

}

reactMixin(Attribute.prototype, Observable);
