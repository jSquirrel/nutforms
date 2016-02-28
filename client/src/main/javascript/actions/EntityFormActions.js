import * as AttributeActions from './../constants/AttributeActions.js';


export default class EntityFormActions {

    /**
     *
     * @param {Attribute} attribute
     * @param {string} name
     * @param {string} value
     */
    static fieldChanged(attribute, name, value) {
        attribute.setValue(value);
    }

    /**
     *
     * @param {Attribute} attribute
     * @param {string} name
     * @param {string} value
     */
    static fieldSaved(attribute, name, value) {
        //console.log(`EntityFormActions.fieldSaved(${attribute}, ${name}, ${value})`);
        // TODO: this one could be used for e.g. email address validation
        attribute.setValue(value);
    }

    /**
     *
     * @param {Model} model
     * @param values
     */
    static formSubmitted(model, values) {
        console.log(`EntityFormActions.formSubmitted(${values})`);
        model.formSubmitted(values);
    }

}
