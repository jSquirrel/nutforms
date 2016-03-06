import DOMHelper from './../helper/DOMHelper.js';

export default class LayoutInjector {

    /**
     * Injects layouts into the element/document.
     *
     * @param {Element|HTMLDocument} element
     * @param {ApiHandler} apiHandler
     * @return {Promise}
     */
    static inject(element, apiHandler) {
        let layouts = DOMHelper.findElementsWithAttribute(element, "nf-layout");
        let promises = [];
        layouts.forEach((layout) => {
            let layoutName = layout.getAttribute("nf-layout");
            promises.push(apiHandler.fetchLayout(layoutName).then((layoutString) => {
                layout.innerHTML = layoutString;
                // TODO: Improvement: recursive calls for nested layouts
            }));
        });
        return Promise.all(promises);
    }

}
