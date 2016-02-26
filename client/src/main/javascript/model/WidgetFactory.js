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
                return "<div class=\"form-group\"><label nf-field-widget-label=\"" + attribute.name + "\" for=\"" + attribute.name + "\">"
                    + "</label>"
                    + "<input nf-field-widget-value=\"" + attribute.name + "\" class=\"form-control\" id=\""
                    + attribute.name + "\" name=\"" + attribute.name + "\" type=\"text\""
                    + disabledString + " /></div>";
            //return "input-text";
            case "java.lang.Long":
                // TODO: replace with loaded widget
                return "<div class=\"form-group\"><label nf-field-widget-label=\"" + attribute.name + "\" for=\"" + attribute.name + "\">"
                    + "</label>"
                    + "<input nf-field-widget-value=\"" + attribute.name + "\" class=\"form-control\" id=\""
                    + attribute.name + "\" name=\"" + attribute.name + "\" type=\"number\""
                    + disabledString + " /></div>";
            //return "input-number";
        }
    }

    /**
     * Loads submit widget from server.
     *
     * @returns {string}
     */
    loadSubmitWidget() {
        let string =
            "<div class=\"form-group\"><button type=\"submit\" class=\"btn btn-default\">"
            + this.model.getSubmitValue()
            + "</button></div>";
        return string;
    }

}
