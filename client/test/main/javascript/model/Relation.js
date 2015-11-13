import assert from 'assert';
import reactMixin from 'react-mixin';
import Relation from '../../../../src/main/javascript/model/Relation.js';

describe('model.Relation', function () {
    it('should have Observable trait', function () {
        let relation = new Relation("bugs", "toMany", null, "cz.cvut.fel.nutforms.example.model.Bug");
        assert.equal('function', typeof relation.listen);
    });
});
