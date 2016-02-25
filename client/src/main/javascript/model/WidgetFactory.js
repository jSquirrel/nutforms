export default class WidgetFactory {

    /**
     * Returns widget name for attribute.
     *
     * @param {Attribute} attribute
     */
    static returnWidgetName(attribute) {
        switch (attribute.type) {
            case "java.lang.String":
                return "input-text";
            case "java.lang.Long":
                return "input-number";
        }
    }

}
