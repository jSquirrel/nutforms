import assert from 'assert';
import Attribute from '../../../../src/main/javascript/model/Attribute.js';

describe('model.Attribute', function () {
    it('should extend Observable', function () {
        let attribute = new Attribute("id", "java.lang.Long", null, null);
        assert.equal('function', typeof attribute.listen);
    });
});
