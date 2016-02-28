import LayoutParser from './../layout/LayoutParser.js'

export default class Renderable {

    /**
     * Layout constructor.
     */
    constructor() {
        this.model = {};
        this.layoutParser = {};
    }

    /**
     * Binds model to the Layout.
     *
     * @param {Model} model
     * @return {Renderable} this
     */
    bind(model) {
        this.model = model;
        this.layoutParser = new LayoutParser(model);
        return this;
    }

    /**
     * Generates HTML of the layout and binds the listeners.
     *
     * @returns {string}
     */
    generateHtml(layoutString) {
        let dom = this.layoutParser.parse(layoutString);
        return new XMLSerializer().serializeToString(dom);
    }

    /**
     * Binds values & labels to element.
     *
     * @param {HTMLDocument} element
     */
    bindValues(element) {
        this.layoutParser.bindValues(element);
    }

    /**
     * Binds listeners to element.
     *
     * @param {HTMLDocument} element
     */
    bindListeners(element) {
        this.layoutParser.bindListeners(element);
    }

}
