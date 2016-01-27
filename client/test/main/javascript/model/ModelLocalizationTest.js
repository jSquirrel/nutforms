import 'babel-polyfill';
import assert from 'assert';
import ModelLocalization from '../../../../src/main/javascript/model/ModelLocalization.js';

describe('model.ModelLocalization', function () {
    it('should contain formLabel and submitValue', function () {
        let modelLocalization = new ModelLocalization("Edit Bug", "Edit");
        assert.equal(modelLocalization.formLabel, "Edit Bug");
        assert.equal(modelLocalization.submitValue, "Edit");
    });
});
