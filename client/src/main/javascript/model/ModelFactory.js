import Model from './Model.js';
import Attribute from './Attribute.js';
import Relation from './Relation.js';
import Validation from './Validation.js';
import AttributeLocalization from './AttributeLocalization.js';
import ModelLocalization from './ModelLocalization.js';
import Submit from './Submit.js';


export default class ModelFactory {

    /**
     * Creates model with given parameters.
     *
     * @param {string} className
     * @param {*} id
     * @param {object} entityMetadata
     * @param {string} context
     * @param {object} localization
     * @param {object} values
     * @param {ApiHandler} apiHandler
     * @returns {Model}
     */
    create(className, id, entityMetadata = {}, context, localization = {}, values = {}, apiHandler) {
        let attributes = this.createAttributes(entityMetadata, localization, values);
        let relations = this.createRelations(entityMetadata, localization, values);
        let modelLocalization = new ModelLocalization(
            localization["form.label"]
            , localization["form.submit.value"]
            , localization["form.submit.succeeded_value"]
            , localization["form.submit.failed_value"]);
        let submit = new Submit(apiHandler);

        return new Model(
            className,
            context,
            id,
            attributes,
            relations,
            modelLocalization,
            new Validation,
            submit
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
                    attributeLocalization,
                    new Validation(),
                    attribute.is_primary
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
                    new AttributeLocalization(localization[`form.${relation.name}.label`]),
                    new Validation()
                );
            });
        }

        return relations;
    }

}
