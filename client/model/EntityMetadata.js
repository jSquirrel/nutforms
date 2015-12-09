import FieldMetadata from './FieldMetadata.js';


export default class EntityMetadata {

    /**
     * EntityMetadata constructor.
     * @param {string} name FQN of the entity.
     * @param {FieldMetadata[]} fields List of entity fields.
     */
    constructor(name, fields, action) {
        this._name = name;
        this._fields = fields;
        this._action = action;
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

    /**
     * Returns action of the entity.
     * @returns {string}
     */
    getAction() {
        return this._action;
    }

}
