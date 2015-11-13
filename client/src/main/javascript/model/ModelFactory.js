import Model from './Model.js';
import Attribute from './Attribute.js';
import Relation from './Relation.js';


export default class ModelFactory {

    create(className, id, entityMetadata = {}, values = {}) {
        let attributes = this.createAttributes(entityMetadata, values);
        let relations = this.createRelations(entityMetadata, values);
        return new Model(className, "", id, attributes, relations);
    }

    /**
     * Creates object with Attributes based on given data.
     *
     * @param {{}} entityMetadata
     * @param {{}} values
     * @returns {{}}
     */
    createAttributes(entityMetadata, values) {
        let attributes = {};
        if (entityMetadata.hasOwnProperty("attributes")) {
            entityMetadata.attributes.forEach((attribute) => {
                let value = values.hasOwnProperty(attribute.name) ? values[attribute.name] : null;
                attributes[attribute.name] = new Attribute(attribute.name, attribute.type, value);
            });
        }
        return attributes;
    }

    /**
     * Creates object with Relations based on given data.
     *
     * @param {{}} entityMetadata
     * @param {{}} values
     * @returns {{}}
     */
    createRelations(entityMetadata, values) {
        let relations = {};
        if (entityMetadata.hasOwnProperty("relationships")) {
            entityMetadata.relationships.forEach((relation) => {
                let value = values.hasOwnProperty(relation.name) ? values[relation.name] : null;
                relations[relation.name] = new Relation(relation.name, relation.type, value, relation["target_entity"]);
            });
        }
        return relations;
    }

}
