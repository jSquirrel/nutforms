import FieldMetadata from './FieldMetadata.js';

export default class EntityMetadata {

    /**
     * EntityMetadata constructor.
     * @param {string} name FQN of the entity.
     * @param {FieldMetadata[]} fields List of entity fields.
     */
    constructor(name, fields) {
        this._name = name;
        this._fields = fields;
    }

    /**
     * Returns name of the entity.
     * @returns {string}
     */
    getName() {
        return this._name;
    }

    /**
     * Returns all fields of the entity.
     * @returns {FieldMetadata[]}
     */
    getFields() {
        return this._fields;
    }

}
