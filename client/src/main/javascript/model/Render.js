import Renderer from './../render/Renderer.js'

export default class Render {

    /**
     * Layout constructor.
     */
    constructor() {
        this.model = {};
        this.renderer = {};
    }

    /**
     * Binds model to the Layout.
     *
     * @param {Model} model
     * @return {Render} this
     */
    bind(model) {
        this.model = model;
        this.renderer = new Renderer(model);
        return this;
    }

    /**
     * Generates HTML of the layout and binds the listeners.
     *
     * @returns {string}
     */
    generateHtml(layoutString) {
        let dom = this.renderer.parse(layoutString);
        return new XMLSerializer().serializeToString(dom);
    }

    /**
     * Binds values & labels to element.
     *
     * @param {HTMLDocument} element
     */
    bindValues(element) {
        this.renderer._injectValues(element);
    }

    /**
     * Binds listeners to element.
     *
     * @param {HTMLDocument} element
     */
    bindListeners(element) {
        this.renderer._bindListeners(element);
    }

}
