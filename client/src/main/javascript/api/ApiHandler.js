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
        this.API_ENDPOINT = 'api/';
        this.RULES_ENDPOINT = 'rules/';
        this.LAYOUT_ENDPOINT = 'layout/';
        this.LOCALIZATION_ENDPOINT = 'localization/';
        this.CLASS_METADATA_ENDPOINT = 'meta/class/';
        this.WIDGET_ENDPOINT = 'widget/';
        this.WIDGET_MAPPING_ENDPOINT = 'widget-mapping/';

        this.apiAddress = apiAddress;
        this.apiUser = apiUser;
        this.apiPassword = apiPassword;

        this._toText = response => response.text();
        this._toJson = response => {
            try {
                return response.json();
            } catch (err) {
                console.log("Error while parsing JSON", response);
                return null;
            }
        };
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
        let localizationPromise = this.fetchLocalization(locale, className + '/' + context);
        let rulesPromise = this.fetchRules(className, context);

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
            //.then(this._logResponse("Class metadata loaded from API"))
            .then(this._toJson)
            ;
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
            //.then(this._logResponse("Localization data loaded from API"))
            ;
    }

    /**
     * Fetches rules for given class within given context
     *
     * @param {string} className
     * @param {string} context
     * @param {string} locale
     * @returns {Promise.<T>}
     */
    fetchRules(className, context, locale) {
        return fetch(this._buildUrl(this.RULES_ENDPOINT + className + '/' + context))
            .then(this._toJson)
            //.then(this._logResponse("Context rules loaded from API"))
            ;
    }

    /**
     * Fetches layout with given name.
     *
     * @param {string} layoutName
     * @returns {Promise.<string>}
     */
    fetchLayout(layoutName) {
        return fetch(this._buildUrl(this.LAYOUT_ENDPOINT + layoutName))
            //.then(this._logResponse("Layout \"" + layoutName + "\" loaded from API"))
            .then(this._toText)
            ;
    }

    /**
     * Fetches widget with given name.
     *
     * @param {string} name
     * @returns {string}
     */
    fetchWidget(name) {
        // TODO: make this asynchronous
        var request = new XMLHttpRequest();
        request.open('GET', this._buildUrl(this.WIDGET_ENDPOINT + name), false);  // `false` makes the request synchronous
        request.send(null);
        return request.responseText;
    }

    /**
     * Fetches widget mapping function.
     *
     * @returns {string}
     */
    fetchWidgetMapping() {
        // TODO: make this asynchronous
        var request = new XMLHttpRequest();
        request.open('GET', this._buildUrl(this.WIDGET_MAPPING_ENDPOINT), false);  // `false` makes the request synchronous
        request.send(null);
        return request.responseText;
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
            //.then(this._logResponse("Entity data loaded from API"))
            ;
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
            //.then(this._logResponse("List data loaded from API"))
            ;
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
            .then(this._logResponse(`Submitted data to API via ${method} method.`))
            ;
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
