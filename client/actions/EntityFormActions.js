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

    static formSubmitted(values) {
        // TODO: on form submitted
        // TODO: add action dispatching
    }

}
