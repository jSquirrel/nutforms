export default class DOMHelper {

    /**
     * Finds all elements in the document which have attribute with given name.
     *
     * @param {Element|HTMLDocument} doc
     * @param {string} attribute
     * @returns {Array}
     */
    static findElementsWithAttribute(doc, attribute) {
        let matchingElements = [];
        let allElements = doc.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                matchingElements.push(allElements[i]);
            }
        }
        return matchingElements;
    }

}
