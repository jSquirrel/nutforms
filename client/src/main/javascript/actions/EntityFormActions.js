export default class EntityFormActions {

    /**
     *
     * @param {Attribute} attribute
     * @param {string} name
     * @param {string} value
     */
    static fieldChanged(attribute, name, value) {
        // TODO: this one could be used for e.g. characters remaining validation
        //console.log(`EntityFormActions.fieldChanged(${name}, ${value})`);
        attribute.setValue(value);
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

    static formSubmitted(attribute, values) {
        console.log(`EntityFormActions.formSubmitted(${values})`);
        // TODO: set values
    }

}
