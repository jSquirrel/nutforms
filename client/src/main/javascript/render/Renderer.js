import EntityFormActions from './../actions/EntityFormActions.js';
import DOMHelper from './../helper/DOMHelper.js';
import * as AttributeActions from './../constants/AttributeActions.js';
import * as ModelActions from './../constants/ModelActions.js';


export default class Renderer {

    /**
     * LayoutParser constructor.
     *
     * @param {Model} model
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Parses the layout from layoutString and weaves in widgets.
     *
     * @param {string} layoutString
     * @return {HTMLDocument} HTMLDocument created from the layoutString with widgets.
     */
    parse(layoutString) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(layoutString, "text/html");
        this._injectWidgets(doc);
        return doc;
    }

    /**
     * Weaves Widgets into the layout document.
     *
     * @param {HTMLDocument} doc
     * @private
     */
    _injectWidgets(doc) {
        let entityForm = DOMHelper.findElementsWithAttribute(doc, "nf-entity-form").shift();
        let usedAttributes = this._addExplicitWidgets(entityForm);
        usedAttributes = this._addIteratorWidgets(usedAttributes, entityForm);
        this._addRemainingWidgets(usedAttributes, entityForm);
        entityForm.insertAdjacentHTML('beforeend', this.model.widgetFactory.loadSubmitWidget());
    }

    /**
     * Adds explicit widgets to the HTMLDocument.
     *
     * @param {Element} entityForm
     * @returns {Array}
     * @private
     */
    _addExplicitWidgets(entityForm) {
        let usedAttributes = [];
        DOMHelper.findElementsWithAttribute(entityForm, "nf-field-widget").forEach((widget) => {
            let attribute = this.model.getAttribute(widget.getAttribute("nf-field-widget"));
            widget.innerHTML = this.model.widgetFactory.loadFieldWidget(attribute);
            usedAttributes.push(attribute.name);
        });
        return usedAttributes;
    }

    _addIteratorWidgets(usedAttributes, entityForm) {
        console.log("addIteratorWidgets() called");
        DOMHelper.findElementsWithAttribute(entityForm, "nf-field-iterator").forEach((iterator) => {
            let numberOfIterations = iterator.getAttribute("nf-field-iterator");
            console.log("numberOfIterations", numberOfIterations);
            let i = 0;
            for (var attributeName in this.model.attributes) {
                if (i >= numberOfIterations) {
                    break;
                }
                let attribute = this.model.attributes[attributeName];
                if (usedAttributes.find(x => x == attributeName) !== undefined) {
                    continue;
                }
                iterator.insertAdjacentHTML('beforeend', this.model.widgetFactory.loadFieldWidget(attribute));
                usedAttributes.push(attributeName);
                i++;
            }
        });

        return usedAttributes;
    }

    /**
     * Adds implicit widgets to the HTMLDocument.
     *
     * @param {string[]} usedAttributes
     * @param {Element} entityForm
     * @private
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

    /**
     * Injects model values & labels to the inputs.
     *
     * @param {HTMLDocument} doc
     */
    injectValues(doc) {

        // Inject values
        DOMHelper.findElementsWithAttribute(doc, "nf-field-widget-value").forEach((value) => {
            let attributeName = value.getAttribute("nf-field-widget-value");
            let attribute = this.model.getAttribute(attributeName);
            let attributeValue = attribute.value;
            if (attributeValue != null) {
                value.setAttribute("value", attributeValue);
            }
        });

        // Inject labels
        DOMHelper.findElementsWithAttribute(doc, "nf-field-widget-label").forEach((label) => {
            let attributeName = label.getAttribute("nf-field-widget-label");
            label.innerHTML = this.model.getAttribute(attributeName).getFormLabel();
        });

        // Inject form labels
        DOMHelper.findElementsWithAttribute(doc, "nf-form-label").forEach((formLabel) => {
            formLabel.innerHTML = this.model.getFormLabel();
        });
    }

    /**
     * Binds model listeners to the inputs.
     *
     * @param {HTMLDocument} doc
     */
    bindListeners(doc) {
        // Bind values listeners
        DOMHelper.findElementsWithAttribute(doc, "nf-field-widget-value").forEach((value) => {
            let attributeName = value.getAttribute("nf-field-widget-value");
            let attribute = this.model.getAttribute(attributeName);

            // Adding event listeners
            value.addEventListener("keyup", (e) => {
                EntityFormActions.fieldChanged(attribute, attributeName, value.value);
            }, false);
            value.addEventListener("change", (e) => {
                EntityFormActions.fieldSaved(attribute, attributeName, value.value);
            }, false);
            value.addEventListener("blur", (e) => {
                EntityFormActions.fieldSaved(attribute, attributeName, value.value);
            }, false);

            // Adding model listeners
            // TODO: Improvement: move to standalone class which will be readable for @ondrakrat
            attribute.listen(AttributeActions.ATTRIBUTE_VALIDATED, (attr) => {

                let infos = [];
                for (let info in attr.validation.info) {
                    if (attr.validation.info.hasOwnProperty(info)) {
                        infos.push("<div class=\"validation-error\">" + attr.validation.info[info] + "</div>");
                    }
                }

                let errors = [];
                for (let error in attr.validation.errors) {
                    if (attr.validation.errors.hasOwnProperty(error)) {
                        infos.push("<div class=\"validation-error\">" + attr.validation.errors[error] + "</div>");
                    }
                }

                let messages = infos.join("\n") + errors.join("\n");

                let errorFields = DOMHelper.findElementsWithAttribute(value.parentElement, "nf-field-widget-errors");
                if (errorFields.length > 0) {
                    errorFields.forEach((field) => {
                        // Add validation messages to each nf-field-widget-errors container
                        field.innerHTML = messages;
                    });
                } else {
                    // If there is no nf-field-widget-errors container, create one
                    value.parentElement.insertAdjacentHTML("beforeend", "<div nf-field-widget-errors>"
                        + messages + "</div>");
                }
            });
        });

        let submits = DOMHelper.findElementsWithAttribute(doc, "nf-submit");
        let model = this.model;
        if (submits.length > 0) {
            let submit = submits.shift(); // TODO: Improvement: what about other submits?
            submit.addEventListener("click", (e) => {
                e.preventDefault();

                let valuesObject = {};
                for (var k = 0, o = values.length; k < o; k++) {
                    let value = values[k];
                    let attributeName = value.getAttribute("nf-field-widget-value");
                    valuesObject[attributeName] = value.value;
                }

                console.log('EntityForm submitted with values: ', valuesObject);

                EntityFormActions.formSubmitted(model, valuesObject);
            });
            model.listen(ModelActions.SUBMIT_SUCCEEDED, (model, result) => {
                submit.setAttribute("disabled", "disabled");
                submit.setAttribute("value", model.getSubmitSucceededValue());
            });
            model.listen(ModelActions.SUBMIT_FAILED, (model, result) => {
                submit.setAttribute("value", model.getSubmitFailedValue());
            });
        }
    }

}
