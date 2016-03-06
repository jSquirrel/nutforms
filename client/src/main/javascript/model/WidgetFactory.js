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

        // TODO: Improvement: use some domain language

        widgetString = widgetString.replace(new RegExp('{attribute.name}', 'g'), attribute.name);
        widgetString = widgetString.replace(new RegExp('{attribute.formLabel}', 'g'), attribute.getFormLabel());
        widgetString = widgetString.replace(new RegExp('{attribute.value}', 'g'), attribute.value);

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
     * @param {Model} model
     * @param {Attribute} attribute
     * @private
     */
    _callWidgetMappingFunction(model, attribute) {
        let mappingFunctionString = this.apiHandler.fetchWidgetMapping();
        let mappingFunction;
        eval(mappingFunctionString);
        return mappingFunction(model.className, model.context, attribute.name, attribute.type, attribute.isPrimary());
    }

}
