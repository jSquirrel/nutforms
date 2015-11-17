import fetch from 'node-fetch';
import Base64 from './Base64.js';

/**
 * Handles calls to API.
 */
export default class ApiHandler {

    /**
     * ApiHandler constructor.
     *
     * @param {string} apiAddress
     * @param {string} apiUser
     * @param {string} apiPassword
     */
    constructor(apiAddress, apiUser, apiPassword) {
        this.apiAddress = apiAddress;
        this.apiUser = apiUser;
        this.apiPassword = apiPassword;

        this._toJson = response => response.json();
        this._logResponse = (message) => {
            return response => {
                console.log(message, response);
                return response
            };
        };

    }

    /**
     * Fetches metadata for given class.
     *
     * @param className
     */
    fetchMetadataFor(className) {

        let classMetadataPromise = fetch(this._buildUrl('meta/class/' + className))
            .then(this._toJson)
            .then(this._logResponse("Class metadata loaded from API"));
        // TODO: more metadata

        return Promise.all([classMetadataPromise]);
    }

    /**
     * Fetches data for given class with given id.
     *
     * @param {string} className
     * @param {*} id
     */
    fetchDataFor(className, id) {

        return Promise.resolve(fetch(this._buildUrl('api/' + className.split(".").pop() + '/' + id), {
                headers: {
                    Authorization: "Basic " + Base64.encode(this.apiUser + ":" + this.apiPassword)
                    , Accept: "application/json;charset=UTF-8"
                    , "Content-type": "application/json;charset=UTF-8"
                }
            }))
            .then(this._toJson)
            .then(this._logResponse("Entity data loaded from API"));
    }

    /**
     * Submits given model to the API using given method.
     *
     * @param {string} className
     * @param {Model} model
     * @param {string} method
     */
    submit(className, model, method) {
        // TODO: submit data
    }

    /**
     * Builds whole URL of the resource for given path.
     *
     * @param {string} path
     * @returns {string}
     * @private
     */
    _buildUrl(path) {
        return this.apiAddress + path;
    }

}