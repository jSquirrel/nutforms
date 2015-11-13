import assert from 'assert';
import Attribute from '../../../../src/main/javascript/model/Attribute.js';

describe('model.Attribute', function () {
    it('should extend Observable', function () {
        let relation = new Attribute("id", "java.lang.Long", null);
        assert.equal('function', typeof relation.listen);
    });
});
