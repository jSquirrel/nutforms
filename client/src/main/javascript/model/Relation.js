import Attribute from './Attribute';


export default class Relation extends Attribute {

    /**
     * Relation constructor.
     *
     * @param {string} name
     * @param {string} type
     * @param {*} value
     * @param {string} value
     */
    constructor(name, type, value, targetClass) {
        super(name, type, value);
        this.targetClass = targetClass;
    }

}
