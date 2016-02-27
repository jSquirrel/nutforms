import fetch from 'node-fetch';
import React from 'react';
import Model from './model/Model.js';
import ApiHandler from './api/ApiHandler.js';
import EntityForm from './components/EntityForm.js';
import EntityList from './components/EntityList.js';
import ModelFactory from './model/ModelFactory.js';
import ValidatorFactory from './validation/ValidatorFactory.js';

import LayoutWeaver from './layout/LayoutWeaver.js';
import FormWeaver from './layout/FormWeaver.js';
import ListWeaver from './layout/ListWeaver.js';

class Nutforms {

    /**
     * Binds nutforms to given element/document.
     *
     * @param {Element|HTMLDocument} doc
     */
    static bind(doc) {
        let url = 'http://localhost:8080/'; // TODO: back to document.location.origin + '/'
        let apiHandler = new ApiHandler(url, 'admin', '1234'); // TODO: this needs security, but that is not part of my thesis
        LayoutWeaver.weave(doc, apiHandler)
            .then(() => {
                return FormWeaver.weave(doc, apiHandler);
            })
            .then(() => {
                return ListWeaver.weave(doc, apiHandler);
            })
            .then(() => console.log("Nutforms bound."));
    }

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
