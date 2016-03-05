import * as ModelActions from './../constants/ModelActions';


export default class Submit {

    /**
     * @param {ApiHandler} apiHandler
     */
    constructor(apiHandler) {
        this.apiHandler = apiHandler;
    }

    /**
     * ModelActions.VALIDATED callback.
     *
     * @param {string} event
     * @param {Model} model
     */
    update(event, model) {
        // The event is always ModelActions.VALIDATED
        if (model.hasErrors()) {
            return;
        }
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
        // TODO: this should be defined by user, not by the framework. This way we are forcing context names and
        // TODO: restricting PUT/DELETE to only one context
        switch (model.context) {
            case "edit":
                return "PUT";
            case "delete":
                return "DELETE";
            case "create":
            default:
                return "POST";
        }
    }

    /**
     * Binds the Submit instance to the given Model.
     *
     * @param {Model} model
     * @return {Submit}
     */
    bind(model) {
        model.listen(ModelActions.VALIDATED, this);
        return this;
    }

}
