import LayoutParser from './../layout/LayoutParser.js'

export default class Layout {

    /**
     * Layout constructor.
     *
     * @param {string} layoutString
     */
    constructor(layoutString) {
        this.layoutString = layoutString;
    }

    generateHtml() {
        let dom = LayoutParser.parse(this.layoutString);
        return this.layoutString;
    }

}
