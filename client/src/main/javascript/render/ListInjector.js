import DOMHelper from './../helper/DOMHelper.js';
import ModelFactory from './../model/ModelFactory.js';
import ValidatorFactory from './../validation/ValidatorFactory.js';


export default class ListInjector {


    static inject(doc, apiHandler, locale) {
        let promises = [];
        let lists = DOMHelper.findElementsWithAttribute(doc, "nf-entity-list");
        lists.forEach((list) => {
            let className = list.getAttribute("nf-entity-list");

            apiHandler.fetchMetadataFor(className, "list", locale).then((results) => {
                let metadata = results[0];
                let localization = results[1];
                let modelFactory = new ModelFactory();

                promises.push(apiHandler.fetchList(className).then((entities) => {
                    let model = modelFactory.create(className, "list", null, metadata, localization, {}, apiHandler);
                    ListInjector._injectLabels(list, model);

                    let rows = DOMHelper.findElementsWithAttribute(list, "nf-entity-list-row");
                    rows.forEach((originalRow) => {
                        entities.forEach((data) => {
                            let row = originalRow.cloneNode(true);
                            let model = modelFactory.create(className, "list", data.id, metadata, localization, data, apiHandler);
                            let widgets = DOMHelper.findElementsWithAttribute(row, "nf-field-widget");
                            widgets.forEach((widget) => {
                                let attribute = model.getAttribute(widget.getAttribute("nf-field-widget"));
                                widget.innerHTML = model.widgetFactory.loadFieldWidget(attribute);
                                model.render.injectValues(widget);
                            });
                            originalRow.parentElement.appendChild(row);
                        });
                        originalRow.parentElement.removeChild(originalRow); // Removes itself when not needed
                    });
                }));
            });
        });

        return Promise.all(promises);
    }

    /**
     * Injects labels into the list header.
     *
     * @param list
     * @param model
     * @private
     */
    static _injectLabels(list, model) {
        let fieldLabels = DOMHelper.findElementsWithAttribute(list, "nf-field-label");
        fieldLabels.forEach((fieldLabel) => {
            let attributeName = fieldLabel.getAttribute("nf-field-label");
            fieldLabel.innerHTML = model.getAttribute(attributeName).getFormLabel();
        });
    }

}
