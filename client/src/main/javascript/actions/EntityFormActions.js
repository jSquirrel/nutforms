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

        // TODO: remove, this is only temporary
        let remaining = 150 - value.length;
        attribute.trigger(AttributeActions.ATTRIBUTE_VALIDATED, {
            validation: {
                errors: [],
                info: [
                    `${remaining} characters remaining`
                ]
            }
        });
    }

    /**
     *
     * @param {Attribute} attribute
     * @param {string} name
     * @param {string} value
     */
    static fieldSaved(attribute, name, value) {
        // TODO: this one could be used for e.g. email address validation
        //console.log(`EntityFormActions.fieldSaved(${name}, ${value})`);
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
