import DOMHelper from './../helper/DOMHelper.js';
import ModelFactory from './../model/ModelFactory.js';
import ValidatorFactory from './../validation/ValidatorFactory.js';
import HTTPHelper from './../helper/HTTPHelper.js';


export default class FormInjector {

    /**
     * Scans for any forms in the element/document. When a form is found, it builds rich model for its entity class and
     * then renders all the widgets.
     *
     * @param {Element|HTMLDocument} doc
     * @param {ApiHandler} apiHandler
     * @param {string} locale
     * @return {Promise}
     */
    static inject(doc, apiHandler, locale) {
        let promises = [];
        DOMHelper.findElementsWithAttribute(doc, "nf-entity-form").forEach((form) => {

            let metaInfo = FormInjector._parseEntityFormAttribute(form.getAttribute("nf-entity-form"));
            let entityId = FormInjector._retrieveEntityId();

            promises.push(apiHandler.fetchMetadataFor(metaInfo.className, metaInfo.context, locale).then((results) => {

                let promises = [];

                let metadata = results[0];
                let localization = results[1];
                let rules = results[2];

                promises.push(apiHandler.fetchDataFor(metaInfo.className, entityId).then((data) => {
                    let modelFactory = new ModelFactory();
                    let model = modelFactory.create(metaInfo.className, metaInfo.context, entityId, metadata, localization, data, apiHandler);
                    ValidatorFactory.addObservers(model, rules, locale);

                    form.innerHTML = model.render.generateHtml(form.parentElement.innerHTML);
                    model.render._injectValues(form);
                    model.render._bindListeners(form);
                }));

                return Promise.all(promises);
            }));
        });

        return Promise.all(promises);
    }

    /**
     * Parses nf-entity-form attribute value and returns class name and context.
     *
     * @param {string} attributeString
     * @returns {{className: string, context: string}}
     * @private
     */
    static _parseEntityFormAttribute(attributeString) {
        let parts = attributeString.split(":");
        if (parts.length < 2) {
            throw new ("Attribute nf-form-layout must be in format className:context, \""
            + attributeString + "\" given.");
        }
        return {className: parts[0], context: parts[1]};
    }

    /**
     * Retrieves entity id from ?id HTML query parameter.
     *
     * @returns {number|null} The id or null if the parameter is not present.
     * @private
     */
    static _retrieveEntityId() {
        let entityId = HTTPHelper.getQueryParameter("id");
        return entityId !== "Not found" ? entityId : null;
    }

}
