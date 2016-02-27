import DOMHelper from './../helper/DOMHelper.js';
import ModelFactory from './../model/ModelFactory.js';
import ValidatorFactory from './../validation/ValidatorFactory.js';


export default class ListWeaver {

    static weave(doc, apiHandler, locale) {
        let lists = DOMHelper.findElementsWithAttribute(doc, "nf-entity-list");
        lists.forEach((list) => {
            let className = list.getAttribute("nf-entity-list");

            apiHandler.fetchMetadataFor(className, "list", locale).then((results) => {
                let metadata = results[0];
                let localization = results[1];
                let modelFactory = new ModelFactory();

                apiHandler.fetchList(className).then((entities) => {
                    let model = modelFactory.create(className, "list", null, metadata, localization, {}, apiHandler);
                    ListWeaver._weaveLabels(list, model);

                    let rows = DOMHelper.findElementsWithAttribute(list, "nf-entity-list-row");
                    rows.forEach((originalRow) => {
                        entities.forEach((data) => {
                            let row = originalRow.cloneNode(true);
                            let model = modelFactory.create(className, "list", data.id, metadata, localization, data, apiHandler);
                            let owidgets = DOMHelper.findElementsWithAttribute(originalRow, "nf-field-widget");
                            let widgets = DOMHelper.findElementsWithAttribute(row, "nf-field-widget");
                            widgets.forEach((widget) => {
                                let attribute = model.getAttribute(widget.getAttribute("nf-field-widget"));
                                widget.innerHTML = model.widgetFactory.loadFieldWidget(attribute);
                                model.layout.bindValues(widget);
                            });
                            originalRow.parentElement.appendChild(row);
                        });
                        originalRow.parentElement.removeChild(originalRow); // Removes itself when not needed
                    });
                });
            });
        });
    }

    static _weaveLabels(list, model) {
        let fieldLabels = DOMHelper.findElementsWithAttribute(list, "nf-field-label");
        fieldLabels.forEach((fieldLabel) => {
            let attributeName = fieldLabel.getAttribute("nf-field-label");
            fieldLabel.innerHTML = model.getAttribute(attributeName).getFormLabel();
        });
    }

}
