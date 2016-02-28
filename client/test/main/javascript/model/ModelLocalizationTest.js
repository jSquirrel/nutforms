import 'babel-polyfill';
import assert from 'assert';
import ModelLocalization from '../../../../src/main/javascript/model/ModelLocalization.js';

describe('model.ModelLocalization', function () {
    it('should contain formLabel and submitValue', function () {
        let modelLocalization = new ModelLocalization("Edit cz.cvut.fel.nutforms.example.model.Bug", "Edit");
        assert.equal(modelLocalization.formLabel, "Edit cz.cvut.fel.nutforms.example.model.Bug");
        assert.equal(modelLocalization.submitValue, "Edit");
    });
});
