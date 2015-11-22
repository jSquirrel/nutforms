import Observable from './Observable.js';


export default class Model extends Observable {

    /**
     * Model constructor.
     *
     * @param {string} className
     * @param {string} context
     * @param {*} id
     * @param {Attribute[]} attributes
     * @param {Relation[]} relations
     * @param {ModelLocalization} localization
     */
    constructor(className, context, id, attributes, relations, localization) {
        super();
        this.className = className;
        this.context = context;
        this.id = id;
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization;
    }

    /**
     * Checks if the model has Attribute with given name.
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasAttribute(name) {
        return this.attributes.hasOwnProperty(name);
    }

    /**
     * Returns Attribute with given name.
     *
     * @param {string} name
     * @returns {Attribute}
     * @throws Will throw an error if Attribute with given name does not exist.
     */
    getAttribute(name) {
        if (!this.hasAttribute(name)) {
            throw `This model does not contain Attribute with name ${name}.`;
        }
        return this.attributes[name];
    }

    /**
     * Checks if the model has Relation with given name.
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasRelation(name) {
        return this.relations.hasOwnProperty(name);
    }

    /**
     * Returns Relation with given name.
     *
     * @param {string} name
     * @returns {Relation}
     * @throws Will throw an error if Relation with given name does not exist.
     */
    getRelation(name) {
        if (!this.hasRelation(name)) {
            throw `This model does not contain Relation with name ${name}.`;
        }
        return this.relations[name];
    }

    /**
     * Returns form label of this model.
     *
     * @returns {string}
     */
    getFormLabel() {
        return this.localization.formLabel;
    }

    /**
     * Returns submit value of this model.
     *
     * @returns {string}
     */
    getSubmitValue() {
        return this.localization.submitValue;
    }

}
