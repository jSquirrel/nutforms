export default class WidgetFactory {

    /**
     * WidgetFactory constructor.
     * @param {ApiHandler} apiHandler
     */
    constructor(apiHandler) {
        this.apiHandler = apiHandler;
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
     * @return {string}
     */
    loadFieldWidget(attribute) {
        let widgetName = this._callWidgetMappingFunction(this.model, attribute);
        let widgetString = this.apiHandler.fetchWidget(widgetName);

        // TODO: use some domain language
        widgetString = widgetString.replace("{attribute.name}", attribute.name);
        widgetString = widgetString.replace("{attribute.formLabel}", attribute.getFormLabel());
        widgetString = widgetString.replace("{attribute.value}", attribute.value);

        return widgetString;
    }

    /**
     * Loads submit widget from server.
     *
     * @returns {string}
     */
    loadSubmitWidget() {
        let string =
            "<div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\" nf-submit=\"submit\" value=\""
            + this.model.getSubmitValue()
            + "\" /></div>";
        return string;
    }


    /**
     * Calls widget mapping function.
     *
     * @param model
     * @param attribute
     * @private
     */
    _callWidgetMappingFunction(model, attribute) {
        let mappingFunction = (model, attribute) => {
            let widgetNamespace = "default";
            if (attribute.isPrimary()) {
                widgetNamespace = "disabled";
            }

            let widgetName = "";
            switch (attribute.type) {
                case "java.lang.String":
                    widgetName = "text-input";
                    break;
                case "java.lang.Long":
                    widgetName = "number-input";
                    break;
            }

            return widgetNamespace + "/" + widgetName;
        };

        return mappingFunction(model, attribute);
    }

}
