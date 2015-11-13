import assert from 'assert';
import reactMixin from 'react-mixin';
import Attribute from '../../../../src/main/javascript/model/Attribute.js';

describe('model.Attribute', function () {
    it('should have Observable trait', function () {
        let relation = new Attribute("id", "java.lang.Long", null);
        assert.equal('function', typeof relation.listen);
    });
});
