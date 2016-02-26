import EntityFormActions from './../actions/EntityFormActions.js';
import * as AttributeActions from './../constants/AttributeActions.js';
import * as ModelActions from './../constants/ModelActions.js';


export default class LayoutParser {

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

    /**
     * Weaves Widgets into the layout document.
     *
     * @param {HTMLDocument} doc
     */
    weaveWidgets(doc) {
        // TODO: What if there are multiple forms or multiple lists, or both?
        // TODO: Maybe raise a warning or throw something
        // TODO: What if there are no forms nor lists, maybe throw something?

        // Entity Form
        let entityForms = this._findElementsWithAttribute(doc, "nf-entity-form");
        if (entityForms.length > 0) {
            let entityForm = entityForms.shift(); // TODO: what about the other forms?
            var usedAttributes = this._addExplicitWidgets(entityForm);
            this._addRemainingWidgets(usedAttributes, entityForm);
            entityForm.insertAdjacentHTML('beforeend', this.model.widgetFactory.loadSubmitWidget());
        }

        // Entity List
        let entityLists = this._findElementsWithAttribute(doc, "nf-entity-list");
        if (entityLists.length > 0) {
            // TODO: list
        }
    }

    /**
     * Binds model values & labels to the inputs.
     *
     * @param {HTMLDocument} doc
     */
    bindValues(doc) {

        // Bind values
        let values = this._findElementsWithAttribute(doc, "nf-field-widget-value");
        for (var k = 0, o = values.length; k < o; k++) {
            let value = values[k];
            let attributeName = value.getAttribute("nf-field-widget-value");
            let attributeValue = this.model.getAttribute(attributeName).value;
            if (attributeValue != null) {
                value.setAttribute("value", attributeValue);
            }
        }

        // Bind labels
        let labels = this._findElementsWithAttribute(doc, "nf-field-widget-label");
        for (var i = 0, n = labels.length; i < n; i++) {
            let label = labels[i];
            let attributeName = label.getAttribute("nf-field-widget-label");
            label.innerHTML = this.model.getAttribute(attributeName).getFormLabel();
        }
    }

    /**
     * Binds model listeners to the inputs.
     *
     * @param {HTMLDocument} doc
     */
    bindListeners(doc) {
        // Bind values listeners
        let values = this._findElementsWithAttribute(doc, "nf-field-widget-value");
        for (var k = 0, o = values.length; k < o; k++) {
            let value = values[k];
            let attributeName = value.getAttribute("nf-field-widget-value");
            let attribute = this.model.getAttribute(attributeName);

            // Adding event listeners
            value.addEventListener("keyup", (e) => {
                console.log("changed", e);
                EntityFormActions.fieldChanged(attribute, attributeName, value.value);
            }, false);
            value.addEventListener("change", (e) => {
                console.log("changed", e);
                EntityFormActions.fieldSaved(attribute, attributeName, value.value);
            }, false);
            value.addEventListener("blur", (e) => {
                console.log("blurred", e);
                EntityFormActions.fieldSaved(attribute, attributeName, value.value);
            }, false);

            // Adding model listeners
            attribute.listen(AttributeActions.ATTRIBUTE_VALIDATED, (attr) => {
                console.log("AttributeActions.ATTRIBUTE_VALIDATED intercepted by value element", attr);
                console.log("validation errors", attr.model.validation.errors);
                console.log("validation info", attr.model.validation.info);
                value.setAttribute("value", attr.value);
            });
        }

        let submits = this._findElementsWithAttribute(doc, "nf-submit");
        let model = this.model;
        if (submits.length > 0) {
            let submit = submits.shift(); // TODO: what about other submits?
            console.log(submit);
            submit.addEventListener("click", (e) => {
                e.preventDefault();

                console.log("Click on submit intercepted by callback", e);

                let valuesObject = {};
                for (var k = 0, o = values.length; k < o; k++) {
                    let value = values[k];
                    let attributeName = value.getAttribute("nf-field-widget-value");
                    valuesObject[attributeName] = value.value;
                }

                console.log('EntityForm submitted with values: ', valuesObject);

                EntityFormActions.formSubmitted(model, valuesObject);
            });
        }
    }

    /**
     *
     *
     * @param {HTMLDocument} doc
     * @param {string} attribute
     * @returns {Array}
     */
    _findElementsWithAttribute(doc, attribute) {
        let matchingElements = [];
        let allElements = doc.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

}
