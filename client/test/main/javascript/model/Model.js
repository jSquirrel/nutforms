import assert from 'assert';
import reactMixin from 'react-mixin';
import Model from '../../../../src/main/javascript/model/Model.js';

describe('model.Model', function () {
    it('should have Observable trait', function () {
        let model = new Model("cz.cvut.fel.nutforms.example.model.Bug", "context", null, []);
        assert.equal('function', typeof model.listen);
    });
});
