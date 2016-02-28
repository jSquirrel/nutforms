import 'babel-polyfill';
import assert from 'assert';
import Relation from '../../../../src/main/javascript/model/Relation.js';

describe('model.Relation', function () {
    it('should extend Observable', function () {
        let relation = new Relation("bugs", "toMany", null, "cz.cvut.fel.nutforms.example.model.cz.cvut.fel.nutforms.example.model.Bug");
        assert.equal('function', typeof relation.listen);
    });
});
