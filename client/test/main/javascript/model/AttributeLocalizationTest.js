import assert from 'assert';
import AttributeLocalization from '../../../../src/main/javascript/model/AttributeLocalization.js';

describe('model.AttributeLocalization', function () {
    it('should contain formLabel', function () {
        let attributeLocalization = new AttributeLocalization("description");
        assert.equal(attributeLocalization.formLabel, "description");
    });
});
