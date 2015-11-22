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
                model.trigger(ModelActions.SUBMIT_SUCCEEDED, model, result);
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
        // TODO: send relations
        //let relations = model.relations;
        //Object.keys(relations).forEach((key) => {
        //    map[key] = relations[key].value;
        //});

        delete map.localizedDescription; // TODO: Fuck you API, fuck you Java getters!

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
        model.listen(ModelActions.VALIDATED, this);
        return this;
    }

}
