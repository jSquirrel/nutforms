import * as ModelActions from './../constants/ModelActions';


export default class Submit {

    /**
     * @param {ApiHandler} apiHandler
     */
    constructor(apiHandler) {
        this.apiHandler = apiHandler;
    }

    /**
     * ModelActions.VALID callback. This event is only fired when the model has no errors (validation was
     * successful).
     *
     * @param {string} event
     * @param {Model} model
     */
    update(event, model) {
        // The event is always ModelActions.VALID
        this.apiHandler.submit(model.className, this.asMap(model), this.getMethod(model), model.id)
            .then((result) => {
                if (result.status >= 200 && result.status < 300) {
                    model.trigger(ModelActions.SUBMIT_SUCCEEDED, model, result);
                } else {
                    model.trigger(ModelActions.SUBMIT_FAILED, model, result);
                }
            })
            .catch(() => {
                model.trigger(ModelActions.SUBMIT_FAILED, model);
            });
    }

    /**
     * Returns key-value representation of the given Model.
     *
     * @param {Model} model
     */
    asMap(model) {
        let map = {};

        let attributes = model.attributes;
        Object.keys(attributes).forEach((key) => {
            // We don't want to send primary attributes
            if (!attributes[key].isPrimary()) {
                map[key] = attributes[key].value;
            }
        });

        let relations = model.relations;
        Object.keys(relations).forEach((key) => {
            map[key] = relations[key].value;
        });

        return map;
    }

    /**
     * Returns name of the submission method.
     *
     * @param {Model} model
     */
    getMethod(model) {
        if (model.id !== null) {
            return "PUT";
        }
        return "POST";
    }

    /**
     * Binds the Submit instance to the given Model.
     *
     * @param {Model} model
     * @return {Submit}
     */
    bind(model) {
        model.listen(ModelActions.VALID, this);
        return this;
    }

}
