import fetch from 'node-fetch';
import React from 'react';
import Model from './model/Model.js';
import ApiHandler from './api/ApiHandler.js';
import EntityForm from './components/EntityForm.js';
import EntityList from './components/EntityList.js';
import ModelFactory from './model/ModelFactory.js';
import ValidatorFactory from './validation/ValidatorFactory.js';


class Nutforms {

    /**
     * Binds EntityForm to element with given id.
     *
     * @param {string} className Name of the entity class.
     * @param {string} context Name of the context in which the form is displayed.
     * @param {string} locale Locale of the form.
     * @param {number|null} entityId Id of the entity, can be NULL.
     * @param {string} bindElementId Id of the HTML element to bind the EntityForm to.
     */
    static bindForm(className, context, locale, entityId, bindElementId) {
        let url = document.location.origin + '/';
        let apiHandler = new ApiHandler(url, 'admin', '1234');
        let modelFactory = new ModelFactory();
        apiHandler.fetchMetadataFor(className, context, locale).then((results) => {
            let metadata = results[0];
            let localization = results[1];
            let rules = results[2];

            apiHandler.fetchDataFor(className, entityId).then((data) => {
                let model = modelFactory.create(className, entityId, metadata, localization, data, apiHandler);
                ValidatorFactory.addObservers(model, rules);

                React.render(
                    <EntityForm model={model}/>,
                    document.getElementById(bindElementId)
                );
            });
        });
    };

    /**
     * Binds EntityList to element with given id.
     *
     * @param {string} className Name of the entity class.
     * @param {object} attributes Names of the attributes to display.
     * @param {string} bindElementId Id of the HTML element to bind the EntityList to.
     */
    static bindList(className, attributes, bindElementId) {
        let url = document.location.origin + '/';
        let apiHandler = new ApiHandler(url, 'admin', '1234');
        apiHandler.fetchList(className).then((results) => {
            React.render(
                <EntityList entities={results} attributes={attributes}/>,
                document.getElementById(bindElementId)
            );
            console.log("Rendered");
        });
    }

    /**
     * Returns query parameter of given name or "Not found" if the parameter doesn't exist.
     *
     * @param {string} name
     * @returns {string}
     */
    static getQueryParameter(name) {
        var result = "Not found",
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === name) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

}

window.nutforms = Nutforms;
