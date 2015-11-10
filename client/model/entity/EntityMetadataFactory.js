import EntityMetadata from './EntityMetadata.js';
import FieldMetadata from './FieldMetadata.js';

export default class EntityMetadataFactory {

    /**
     * Creates EntityMetadata from given data.
     * @param {string} entityName
     * @param {object} metadata
     * @returns {EntityMetadata}
     */
    static create(entityName, metadata) {

        let fields = [];

        metadata.attributes.forEach((attribute) => {
            let fieldMetadata = new FieldMetadata(attribute.name, attribute.type);
            fields.push(fieldMetadata);
        });

        // TODO: rules

        return new EntityMetadata(entityName, fields);
    }

}
