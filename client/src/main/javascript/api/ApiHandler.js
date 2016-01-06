import fetch from 'node-fetch';
import Base64 from './Base64.js';

/**
 * Handles calls to API.
 */
export default class ApiHandler {

    const API_ENDPOINT = 'api/';
    const RULES_ENDPOINT = 'rules/';
    const LOCALIZATION_ENDPOINT = 'localization/';
    const CLASS_METADATA_ENDPOINT = 'meta/class/';

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
     * @returns {Promise.<T>}
     */
    fetchMetadataFor(className, context, locale) {

        let classMetadataPromise = this.fetchClassData(className);
        let localizationPromise = this.fetchLocalization(locale, className + '/' + context)
        let rulesPromise = this.fetchRules(className, context);
        // TODO: more metadata

        return Promise.all([classMetadataPromise, localizationPromise, rulesPromise]);
    }

    /**
     * Fetches only class data for given class
     *
     * @param {string} className class FQN
     * @returns {Promise.<T>}
     */
    fetchClassData(className) {
        return fetch(this._buildUrl(this.CLASS_METADATA_ENDPOINT + className))
            .then(this._toJson)
            .then(this._logResponse("Class metadata loaded from API"));
    }

    /**
     * Fetches translation of given key for given context
     *
     * @param {string} locale
     * @param {string} translationKey
     * @returns {Promise.<T>}
     */
    fetchLocalization(locale, translationKey) {
        return fetch(this._buildUrl(this.LOCALIZATION_ENDPOINT + locale + '/' + translationKey))
            .then(this._toJson)
            .then(this._logResponse("Localization data loaded from API"));
    }

    /**
     * Fetches rules for given class within given context
     *
     * @param {string} className
     * @param {string} context
     * @returns {Promise.<T>}
     */
    fetchRules(className, context) {
        return fetch(this._buildUrl(this.RULES_ENDPOINT + className + '/' + context))
            .then(this._toJson)
            .then(this._logResponse("Context rules loaded from API"));
    }

    /**
     * Fetches data for given class with given id.
     *
     * @param {string} className
     * @param {*} id
     * @returns {Promise.<T>}
     */
    fetchDataFor(className, id) {

        if (id === null) {
            return Promise.resolve({});
        }

        return fetch(this._buildUrl(this.API_ENDPOINT + className.split(".").pop() + '/' + id), {
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
     * Fetches all entities of given class and lists their from given attributes.
     *
     * @param {string} className
     * @returns {Promise.<T>}
     */
    fetchList(className) {
        return fetch(this._buildUrl(this.API_ENDPOINT + className.split(".").pop()), {
            headers: {
                Authorization: "Basic " + Base64.encode(this.apiUser + ":" + this.apiPassword)
                , Accept: "application/json;charset=UTF-8"
                , "Content-type": "application/json;charset=UTF-8"
            }
        })
            .then(this._toJson)
            .then(this._logResponse("List data loaded from API"));
    }

    /**
     * Submits given model to the API using given method.
     *
     * @param {string} className
     * @param {object} data
     * @param {string} method
     * @param {number} id
     */
    submit(className, data, method, id) {
        let url = this._buildUrl(this.API_ENDPOINT + className.split(".").pop());
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
