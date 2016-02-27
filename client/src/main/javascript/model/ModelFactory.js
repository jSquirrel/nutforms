import Model from './Model.js';
import Attribute from './Attribute.js';
import Relation from './Relation.js';
import AttributeLocalization from './AttributeLocalization.js';
import ModelLocalization from './ModelLocalization.js';
import Submit from './Submit.js';
import WidgetFactory from './WidgetFactory.js';


export default class ModelFactory {

    /**
     * Creates model with given parameters.
     *
     * @param {string} className
     * @param {string} context
     * @param {*} id
     * @param {object} entityMetadata
     * @param {object} localization
     * @param {object} values
     * @param {ApiHandler} apiHandler
     * @returns {Model}
     */
    create(className, context, id, entityMetadata = {}, localization = {}, values = {}, apiHandler) {
        let attributes = this.createAttributes(entityMetadata, localization, values);
        let relations = this.createRelations(entityMetadata, localization, values);
        let modelLocalization = new ModelLocalization(
            localization["form.label"]
            , localization["form.submit.value"]
            , localization["form.submit.succeeded_value"]
            , localization["form.submit.failed_value"]);
        let submit = new Submit(apiHandler);
        let widgetFactory = new WidgetFactory(apiHandler);

        return new Model(
            className,
            context,
            id,
            attributes,
            relations,
            modelLocalization,
            submit,
            widgetFactory
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
                    new AttributeLocalization(localization[`form.${relation.name}.label`])
                );
            });
        }

        return relations;
    }

}
