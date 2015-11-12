import reactMixin from 'react-mixin';
import Observable from './Observable.js';


export default class Model {

    /**
     * Model constructor.
     *
     * @param {string} className
     * @param {string} context
     * @param {*} id
     * @param {Attribute[]} attributes
     */
    constructor(className, context, id, attributes) {
        this.className = className;
        this.context = context;
        this.id = id;
        this.attributes = attributes;
    }

}

reactMixin(Model.prototype, Observable);
