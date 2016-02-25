export default class LayoutParser {

    /**
     *
     * @param {string} layoutString
     */
    static parse(layoutString) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(layoutString, "text/html");
        let matchingElements = LayoutParser.findElementsWithAttribute(doc, "nf-entity-form");
        console.log("matchingElements" + matchingElements);

        return doc;
    }

    /**
     *
     *
     * @param {{}} doc
     * @param {string} attribute
     * @returns {Array}
     */
    static findElementsWithAttribute(doc, attribute) {
        let matchingElements = [];
        let allElements = doc.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++)
        {
            if (allElements[i].getAttribute(attribute) !== null)
            {
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

}
