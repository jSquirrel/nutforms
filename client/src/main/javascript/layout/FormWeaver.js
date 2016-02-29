import DOMHelper from './../helper/DOMHelper.js';
import ModelFactory from './../model/ModelFactory.js';
import ValidatorFactory from './../validation/ValidatorFactory.js';
import HTTPHelper from './../helper/HTTPHelper.js';


export default class FormWeaver {

    static weave(doc, apiHandler, locale) {
        let forms = DOMHelper.findElementsWithAttribute(doc, "nf-entity-form");
        forms.forEach((form) => {
            let attribute = form.getAttribute("nf-entity-form");
            let parts = attribute.split(":");
            if (parts.length < 2) {
                throw new ("Attribute nf-form-layout must be in format className:context[:id], \""
                + attribute + "\" given.");
            }
            let className = parts[0];
            let context = parts[1];
            let entityId = HTTPHelper.getQueryParameter("id");
            entityId = entityId !== "Not found" ? entityId : null;

            apiHandler.fetchMetadataFor(className, context, locale).then((results) => {
                let metadata = results[0];
                let localization = results[1];
                let rules = results[2];

                apiHandler.fetchDataFor(className, entityId).then((data) => {
                    let modelFactory = new ModelFactory();
                    let model = modelFactory.create(className, context, entityId, metadata, localization, data, apiHandler);
                    ValidatorFactory.addObservers(model, rules, locale);

                    form.innerHTML = model.layout.generateHtml(form.parentElement.innerHTML);
                    model.layout.bindValues(form);
                    model.layout.bindListeners(form);
                });
            });
        });
    }

    /**
     * Adds explicit widgets to the HTMLDocument.
     *
     * @param {HTMLDocument} entityForm
     * @returns {Array}
     */
    _addExplicitWidgets(entityForm) {
        let usedAttributes = [];
        let explicitWidgets = this._findElementsWithAttribute(entityForm, "nf-field-widget");
        for (var i = 0, n = explicitWidgets.length; i < n; i++) {
            let widget = explicitWidgets[i];
            let attribute = this.model.getAttribute(widget.getAttribute("nf-field-widget"));
            widget.innerHTML = this.model.widgetFactory.loadFieldWidget(attribute);
            usedAttributes.push(attribute.name);
        }
        return usedAttributes;
    }

    /**
     * Adds implicit widgets to the HTMLDocument.
     *
     * @param {string[]} usedAttributes
     * @param {HTMLDocument} entityForm
     */
    _addRemainingWidgets(usedAttributes, entityForm) {
        // Add remaining/implicit widgets
        for (var attributeName in this.model.attributes) {
            let attribute = this.model.attributes[attributeName];
            if (usedAttributes.find(x => x == attributeName) !== undefined) {
                continue;
            }
            entityForm.insertAdjacentHTML('beforeend', this.model.widgetFactory.loadFieldWidget(attribute));
        }
    }
}
