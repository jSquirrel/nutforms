/*
 * Variables:
 *  - mappingFunction - set your function as value of this variable
 *  - model {string} - Name of the class
 *  - context {string} - Name of the context
 *  - attributeName {string} - Name of the attribute
 *  - attributeType {string} - Type of the attribute
 *  - isAttributePrimary {boolean} - Is the attribute primary?
 */

mappingFunction = function (className, context, attributeName, attributeType, isAttributePrimary) {
    var widgetNamespace = "default";

    if (context === "list") {
        widgetNamespace = "list";
    } else if (context === "delete" || isAttributePrimary) {
        widgetNamespace = "disabled";
    }

    var widgetName = "";
    switch (attributeType) {
        case "java.lang.String":
            widgetName = "text-input";
            break;
        case "java.lang.Long":
            widgetName = "number-input";
            break;
    }

    return widgetNamespace + "/" + widgetName;
};
