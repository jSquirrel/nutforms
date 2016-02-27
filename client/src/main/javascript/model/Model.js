import Observable from './Observable.js';
import * as ModelActions from './../constants/ModelActions.js';


export default class Model extends Observable {

    /**
     * Model constructor.
     *
     * @param {string} className
     * @param {string} context
     * @param {*} id
     * @param {{}|Attribute[]} attributes
     * @param {{}|Relation[]} relations
     * @param {ModelLocalization} localization
     * @param {Submit} submit
     * @param {WidgetFactory} widgetFactory
     */
    constructor(className, context, id, attributes, relations, localization, submit, widgetFactory) {
        super();
        this.className = className;
        this.context = context;
        this.id = id;
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization;
        this.submit = submit.bind(this);
        this.layout = layout.bind(this);
        this.widgetFactory = widgetFactory.bind(this);
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

    /**** Submit ******************************************************************************************************/

    /**
     * Set values to each attribute.
     *
     * @param {object} values Object with Attribute names as keys and Attribute values as values.
     * @throws Will throw an error if Attribute with given name does not exist.
     */
    formSubmitted(values) {
        Object.keys(values).forEach((key) => {
            this.getAttribute(key).setValue(values[key]);
        });
        this.trigger(ModelActions.SUBMITTED, this);
        // TODO: add validation
        // TODO: the line below should be done by Validation
        this.trigger(ModelActions.VALIDATED, this)
    }

    /**** Validation **************************************************************************************************/

    /**
     * Returns true if the model has validation errors, false if there are none.
     *
     * @returns {boolean}
     */
    hasErrors() {
        return false;
        // TODO:
        // return this.validation.hasErrors();
    }

    /**** Localization ************************************************************************************************/

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

    /**
     * Returns submit succeeded value of this model.
     *
     * @returns {string}
     */
    getSubmitSucceededValue() {
        return this.localization.submitSucceededValue;
    }

    /**
     * Returns submit failed value of this model.
     *
     * @returns {string}
     */
    getSubmitFailedValue() {
        return this.localization.submitFailedValue;
    }

}
