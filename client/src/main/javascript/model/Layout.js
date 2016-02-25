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
    }

    /**
     * Binds model to the Layout.
     *
     * @param {Model} model
     * @return {Layout} this
     */
    bind(model) {
        this.model = model;
        return this;
    }

    /**
     * Generates HTML of the layout and binds the listeners.
     *
     * @returns {string}
     */
    generateHtml() {
        let dom = new LayoutParser(this.model).parse(this.layoutString);
        return new XMLSerializer().serializeToString(dom);
    }

}
