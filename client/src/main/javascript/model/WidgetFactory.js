export default class WidgetFactory {

    /**
     * WidgetFactory constructor.
     */
    constructor() {
        this.model = {};
    }

    /**
     * Binds WidgetFactory to the Model.
     *
     * @param {Model} model
     * @returns {WidgetFactory}
     */
    bind(model) {
        this.model = model;
        return this;
    }

    /**
     * Returns widget name for attribute.
     *
     * @param {Attribute} attribute
     */
    loadFieldWidget(attribute) {

        let disabledString = "";
        if (attribute.isPrimary()) {
            disabledString = " disabled=\"disabled\""
        }

        switch (attribute.type) {
            case "java.lang.String":
                // TODO: replace with loaded widget
                return "<label nf-field-widget-label=\"id\" for=\"id\">"
                    + "</label>"
                    + "<input nf-field-widget-value=\"id\" class=\"form-control\" id=\"id\" name=\"id\" type=\"text\""
            //return "input-text";
            case "java.lang.Long":
                // TODO: replace with loaded widget
                return "<label nf-field-widget-label=\"id\" for=\"id\">"
                    + "</label>"
                    + "<input nf-field-widget-value=\"id\" class=\"form-control\" id=\"id\" name=\"id\" type=\"number\""
                    + disabledString + " />";
            //return "input-number";
        }
    }

    /**
     * Loads submit widget from server.
     *
     * @returns {string}
     */
    loadSubmitWidget() {
        console.log("loading submit widget");
        let string =
            "<button type=\"submit\" class=\"btn btn-default\">"
            + this.model.getSubmitValue()
            + "</button>";
        console.log("loaded submit widget");
        return string;
    }

}
