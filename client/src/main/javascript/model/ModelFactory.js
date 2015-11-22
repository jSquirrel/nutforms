import Model from './Model.js';
import Attribute from './Attribute.js';
import Relation from './Relation.js';
import AttributeLocalization from './AttributeLocalization.js';
import ModelLocalization from './ModelLocalization.js';


export default class ModelFactory {

    create(className, id, entityMetadata = {}, localization = {}, values = {}) {
        let attributes = this.createAttributes(entityMetadata, localization, values);
        let relations = this.createRelations(entityMetadata, localization, values);
        let modelLocalization = new ModelLocalization(localization["form.label"], localization["form.submit.value"]);

        return new Model(
            className,
            "",
            id,
            attributes,
            relations,
            modelLocalization
        );
    }

    /**
     * Creates object with Attributes based on given data.
     *
     * @param {{}} entityMetadata
     * @param {{}} localization
     * @param {{}} values
     * @returns {{}}
     */
    createAttributes(entityMetadata, localization, values) {
        let attributes = {};

        if (entityMetadata.hasOwnProperty("attributes")) {
            entityMetadata.attributes.forEach((attribute) => {
                let value = values.hasOwnProperty(attribute.name) ? values[attribute.name] : null;
                let attributeLocalization = new AttributeLocalization(localization[`form.${attribute.name}.label`]);
                attributes[attribute.name] = new Attribute(
                    attribute.name,
                    attribute.type,
                    value,
                    attributeLocalization
                );
            });
        }

        return attributes;
    }

    /**
     * Creates object with Relations based on given data.
     *
     * @param {{}} entityMetadata
     * @param {{}} localization
     * @param {{}} values
     * @returns {{}}
     */
    createRelations(entityMetadata, localization, values) {
        let relations = {};

        if (entityMetadata.hasOwnProperty("relationships")) {
            entityMetadata.relationships.forEach((relation) => {
                let value = values.hasOwnProperty(relation.name) ? values[relation.name] : null;
                relations[relation.name] = new Relation(
                    relation.name,
                    relation.type,
                    value, relation["target_entity"],
                    new AttributeLocalization(localization[`form.${relation.name}.label`])
                );
            });
        }

        return relations;
    }

}
