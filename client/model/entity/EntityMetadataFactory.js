import EntityMetadata from './EntityMetadata.js';
import FieldMetadata from './FieldMetadata.js';

export default class EntityMetadataFactory {

    /**
     * Creates EntityMetadata from given data.
     * @param {string} entityName
     * @returns {Promise<EntityMetadata>}
     */
    static create(entityName) {
        // TODO: load data from API (/meta, /rule)
        // TODO: parametrize URL of the api
        // TODO: enable CORS (now ahs to be disabled via developer mode in browser)
        return fetch(this.getUrlPrefix() + entityName)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                let fields = [];

                json.attributes.forEach((attribute) => {
                    let fieldMetadata = new FieldMetadata(attribute.name, attribute.type);
                    fields.push(fieldMetadata);
                });

                return new EntityMetadata(entityName, fields);
            })
            .catch(function (ex) {
                console.log('Loading entity metadata failed!', ex)
            });
    }

    static getUrlPrefix() {
        return 'http://localhost:8080/meta/class/';
    }
}
