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
        this.weaveWidgets(doc);
        return doc;
    }

    /**
     * Adds explicit widgets to the HTMLDocument.
     *
     * @param {Element} entityForm
     * @returns {Array}
     */
    _addExplicitWidgets(entityForm) {
        let usedAttributes = [];
        let explicitWidgets = DOMHelper.findElementsWithAttribute(entityForm, "nf-field-widget");
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
     * @param {Element} entityForm
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
     * Weaves Widgets into the layout document.
     *
     * @param {HTMLDocument} doc
     */
    weaveWidgets(doc) {
        let entityForms = DOMHelper.findElementsWithAttribute(doc, "nf-entity-form");
        let entityForm = entityForms.shift();
        var usedAttributes = this._addExplicitWidgets(entityForm);
        this._addRemainingWidgets(usedAttributes, entityForm);
        entityForm.insertAdjacentHTML('beforeend', this.model.widgetFactory.loadSubmitWidget());
    }

    /**
     * Binds model values & labels to the inputs.
     *
     * @param {HTMLDocument} doc
     */
    bindValues(doc) {

        // Bind values
        let values = DOMHelper.findElementsWithAttribute(doc, "nf-field-widget-value");
        for (var k = 0, o = values.length; k < o; k++) {
            let value = values[k];
            let attributeName = value.getAttribute("nf-field-widget-value");
            let attributeValue = this.model.getAttribute(attributeName).value;
            if (attributeValue != null) {
                value.setAttribute("value", attributeValue);
            }
        }

        // Bind labels
        let labels = DOMHelper.findElementsWithAttribute(doc, "nf-field-widget-label");
        for (var i = 0, n = labels.length; i < n; i++) {
            let label = labels[i];
            let attributeName = label.getAttribute("nf-field-widget-label");
            label.innerHTML = this.model.getAttribute(attributeName).getFormLabel();
        }

        // Bind form labels
        let formLabels = DOMHelper.findElementsWithAttribute(doc, "nf-form-label");
        formLabels.forEach((formLabel) => {
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
        let values = DOMHelper.findElementsWithAttribute(doc, "nf-field-widget-value");
        for (var k = 0, o = values.length; k < o; k++) {
            let value = values[k];
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
            attribute.listen(AttributeActions.ATTRIBUTE_VALIDATED, (attr) => {
                let messages = this.createErrors(attr);

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
        }

        let submits = DOMHelper.findElementsWithAttribute(doc, "nf-submit");
        let model = this.model;
        if (submits.length > 0) {
            let submit = submits.shift(); // TODO: what about other submits?
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
            model.listen(ModelActions.VALIDATED, (model) => {
                let formLabel = DOMHelper.findElementsWithAttribute(doc, 'nf-form-label')[0];
                let messages = this.createErrors(model);

                let errorFields = DOMHelper.findElementsWithAttribute(formLabel.parentElement, "nf-model-widget-errors");
                if (errorFields.length > 0) {
                    errorFields.forEach((field) => {
                        // Add validation messages to each nf-field-widget-errors container
                        field.innerHTML = messages;
                    });
                } else {
                    // If there is no nf-field-widget-errors container, create one
                    formLabel.insertAdjacentHTML("afterend", "<div nf-model-widget-errors>"
                        + messages + "</div>");
                }
            })
        }
    }

    /**
     * Creates HTML elements containing error messages to the given Observable object.
     *
     * @param {Observable} observable object to which the messages will be related (Model/Attribute)
     * @returns {string} list of HTML elements with errors
     */
    createErrors(observable) {
        let infos = [];  // "<div class=\"validation-error\">" + observable.state + "</div>"
        for (let info in observable.validation.info) {
            if (observable.validation.info.hasOwnProperty(info)) {
                infos.push("<div class=\"validation-error\">" + observable.validation.info[info] + "</div>");
            }
        }

        let errors = [];
        for (let error in observable.validation.errors) {
            if (observable.validation.errors.hasOwnProperty(error)) {
                infos.push("<div class=\"validation-error\">" + observable.validation.errors[error] + "</div>");
            }
        }

        return infos.join("\n") + errors.join("\n");
    }

}
