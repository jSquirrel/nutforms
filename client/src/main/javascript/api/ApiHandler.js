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
     * @param {string} className
     * @param {string} context
     * @param {string} locale
     */
    fetchMetadataFor(className, context, locale) {

        let classMetadataPromise = fetch(this._buildUrl('meta/class/' + className))
            .then(this._toJson)
            .then(this._logResponse("Class metadata loaded from API"));
        let localizationPromise = fetch(this._buildUrl('localization/' + locale + '/' + className + '/' + context))
            .then(this._toJson)
            .then(this._logResponse("Localization data loaded from API"));
        let rulesPromise = fetch(this._buildUrl('rules/' + className + '/' + context))
            .then(this._toJson)
            .then(this._logResponse("Context rules loaded from API"));
        // TODO: more metadata

        return Promise.all([classMetadataPromise, localizationPromise, rulesPromise]);
    }

    /**
     * Fetches data for given class with given id.
     *
     * @param {string} className
     * @param {*} id
     */
    fetchDataFor(className, id) {

        if (id === null) {
            return Promise.resolve({});
        }

        return fetch(this._buildUrl('api/' + className.split(".").pop() + '/' + id), {
            headers: {
                Authorization: "Basic " + Base64.encode(this.apiUser + ":" + this.apiPassword)
                , Accept: "application/json;charset=UTF-8"
                , "Content-type": "application/json;charset=UTF-8"
            }
        })
            .then(this._toJson)
            .then(this._logResponse("Entity data loaded from API"));
    }

    /**
     * Submits given model to the API using given method.
     *
     * @param {string} className
     * @param {object} data
     * @param {string} method
     */
    submit(className, data, method, id) {
        let url = this._buildUrl('api/' + className.split(".").pop());
        if (id !== null) {
            url += '/' + id;
        }
        return fetch(url, {
            method: method,
            headers: {
                Authorization: "Basic " + Base64.encode(this.apiUser + ":" + this.apiPassword)
                , Accept: "application/json;charset=UTF-8"
                , "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(data)
        })
            .then(this._logResponse(`Submitted data to API via ${method} method.`));
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
