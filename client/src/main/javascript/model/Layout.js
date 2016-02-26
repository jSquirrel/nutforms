import LayoutParser from './../layout/LayoutParser.js'

export default class Layout {

    /**
     * Layout constructor.
     *
     * @param {string} layoutString
     */
    constructor(layoutString) {
        this.layoutString = layoutString;
        this.model = {};
        this.layoutParser = {};
    }

    /**
     * Binds model to the Layout.
     *
     * @param {Model} model
     * @return {Layout} this
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
    generateHtml() {
        let dom = this.layoutParser.parse(this.layoutString);
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
