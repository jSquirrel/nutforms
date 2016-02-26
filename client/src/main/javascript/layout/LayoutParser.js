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
     *
     * @param {string} layoutString
     */
    parse(layoutString) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(layoutString, "text/html");
        this.weaveWidgets(doc);
        this.bindListeners(doc);

        return doc;
    }

    /**
     * Adds explicit widgets to the HTMLDocument.
     *
     * @param {HTMLDocument} entityForm
     * @returns {Array}
     */
    addExplicitWidgets(entityForm) {
        let usedAttributes = [];
        let explicitWidgets = this.findElementsWithAttribute(entityForm, "nf-field-widget");
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
    addRemainingWidgets(usedAttributes, entityForm) {
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
        let entityForms = this.findElementsWithAttribute(doc, "nf-entity-form");
        if (entityForms.length > 0) {
            let entityForm = entityForms.shift(); // TODO: what about the other forms?
            var usedAttributes = this.addExplicitWidgets(entityForm);
            this.addRemainingWidgets(usedAttributes, entityForm);
            entityForm.insertAdjacentHTML('beforeend', this.model.widgetFactory.loadSubmitWidget());
        }

        // Entity List
        let entityLists = this.findElementsWithAttribute(doc, "nf-entity-list");
        if (entityLists.length > 0) {
            // TODO: list
        }
    }

    /**
     * Binds model listeners to the inputs.
     *
     * @param {HTMLDocument} doc
     */
    bindListeners(doc) {
        // TODO
    }

    /**
     *
     *
     * @param {HTMLDocument} doc
     * @param {string} attribute
     * @returns {Array}
     */
    findElementsWithAttribute(doc, attribute) {
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
