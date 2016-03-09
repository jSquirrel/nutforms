import Observable from './Observable.js';
import Layout from './Layout.js';
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
     * @param {Validation} validation
     * @param {Submit} submit
     * @param {WidgetFactory} widgetFactory
     */
    constructor(className, context, id, attributes, relations, localization, validation, submit, widgetFactory) {
        super();
        this.className = className;
        this.context = context;
        this.id = id;
        this.attributes = attributes;
        this.relations = relations;
        this.localization = localization;
        this.validation = validation.bind(this);
        this.submit = submit.bind(this);
        this.layout = new Layout().bind(this);
        this.widgetFactory = widgetFactory.bind(this);
        this.listen(ModelActions.VALIDATED, this);
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
            this.getAttribute(key).setValue(values[key]);   // invokes field-changed
        });
        this.trigger(ModelActions.SUBMITTED, this);
        // toDo: if the model has SUBMITTED observers that od not trigger VALIDATED, the form wont be submitted
        // toDo: also, multiple model-related rules might not be evaluated correctly (fist passes/second does not)
        if (!this.hasObserver(ModelActions.SUBMITTED)) {    // if there are no model observers, fire the event manually
            this.validated();
        }
    }

    /**** Validation **************************************************************************************************/

    /**
     * Returns <code>true</code> if the model has validation errors, <code>false</code> if there are none. This
     * includes all attributes, relations, as well as the model itself.
     *
     * @returns {boolean}
     */
    hasErrors() {
        let errors = false;
        Object.keys(this.attributes).forEach((attr) => errors |= this.getAttribute(attr).hasErrors());
        //Object.keys(this.relations).forEach((relation) => errors |= this.getRelation(relation).hasErrors());
        errors |= this.validation.hasErrors();  // toDo: probably also add state
        return errors;
    }

    /**
     * Triggers the ModelActions.VALIDATED event
     */
    validated() {
        this.trigger(ModelActions.VALIDATED, this);
    }

    /**
     * Checks, if the model is valid and if so, triggers ModelActions.VALID event
     */
    update() {
        if (!this.hasErrors()) {
            this.trigger(ModelActions.VALID, this);
        }
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
