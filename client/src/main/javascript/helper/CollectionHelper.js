/**
 * Created by Ondřej Kratochvíl on 6.3.16.
 */
export default class CollectionHelper {

    /**
     * Returns array of indexes of objects from given array, that have given attribute equal to given value. For instance,
     * calling this function as
     * <code>findWithAttribute([{attr:1}, {attr:2}, {another:'asdf'}, {attr:2}], 'attr', 2)</code>
     * will return [1,3].
     *
     * @param {Array.<object>} array array of objects
     * @param {string} attribute name of object property that is being tested
     * @param {*} value desired value of given attribute
     * @returns {Array.<number>} index of the first object with desired attribute value, or <code>undefined</code> if such
     * object is not present in the given array
     */
    static findWithAttribute(array, attribute, value) {
        let indexes = [];
        for (var i = 0; i < array.length; ++i) {
            if (array[i][attribute] === value) {
                indexes.push(i);
            }
        }
        return indexes;
    }
}