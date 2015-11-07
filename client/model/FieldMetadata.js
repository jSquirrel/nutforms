export default class FieldMetadata {

    /**
     * FieldMetadata constructor.
     * @param {string} name
     * @param {string} type
     */
    constructor(name, type) {
        this._name = name;
        this._type = type;
    }

    /**
     * Returns name of the field.
     * @returns {string}
     */
    getName() {
        return this._name;
    }

    /**
     * Returns type of the field.
     * @returns {string}
     */
    getType() {
        return this._type;
    }

}
