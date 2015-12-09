import EntityStore from '../store/EntityStore.js';


export default class EntityFormActions {

    static fieldChanged(name, value) {
        // TODO: on field changed
        // TODO: add action dispatching
        // TODO: this one could be used for e.g. characters remaining validation
        console.log(`EntityFormActions.fieldChanged(${name}, ${value})`);
    }

    static fieldSaved(name, value) {
        // TODO: on field saved
        // TODO: add action dispatching
        // TODO: this one could be used for e.g. email address validation
        console.log(`EntityFormActions.fieldSaved(${name}, ${value})`);
    }

    /**
     *
     * @param {EntityMetadata} metadata
     * @param {object} values
     */
    static formSubmitted(metadata, values) {
        // TODO: validation?
        console.log(`EntityFormActions.formSubmitted()`);
        EntityStore.save(metadata, values);
    }

}
