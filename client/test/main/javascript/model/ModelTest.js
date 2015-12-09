import assert from 'assert';
import Model from '../../../../src/main/javascript/model/Model.js';
import Submit from '../../../../src/main/javascript/model/Submit.js';

describe('model.Model', function () {
    it('should extend Observable', function () {
        let model = new Model("cz.cvut.fel.nutforms.example.model.Bug", "context", null, {}, {}, null, new Submit(null, null));
        assert.equal('function', typeof model.listen);
    });
});
