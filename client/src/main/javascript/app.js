import fetch from 'node-fetch';
import React from 'react';
import Model from './model/Model.js';
import ApiHandler from './api/ApiHandler.js';
import EntityForm from './components/EntityForm.js';
import ModelFactory from './model/ModelFactory.js';

let className = "cz.cvut.fel.nutforms.example.model.Bug";
let context = "edit";
let localeParam = getQueryParameter("locale");
let locale = localeParam ? localeParam : "cs_CZ";
let id = 1;
let bindElementId = 'form';

// TODO: move this to a library function
((className, context, locale, entityId, bindElementId) => {

    let apiHandler = new ApiHandler('http://localhost:8080/', 'admin', '1234');
    let modelFactory = new ModelFactory();

    apiHandler.fetchMetadataFor(className, context, locale).then((results) => {
        let metadata = results[0];
        let localization = results[1];

        apiHandler.fetchDataFor(className, entityId).then((data) => {
            let model = modelFactory.create(className, entityId, metadata, localization, data);

            React.render(
                <EntityForm model={model}/>,
                document.getElementById(bindElementId)
            );
        });
    });
})(className, context, locale, id, bindElementId);

/**
 * Returns GET parameter with given name or null.
 *
 * @param {string} name
 * @returns {string|null}
 */
function getQueryParameter(name) {
    var result = "Not found",
        tmp = [];
    location.search
        //.replace ( "?", "" )
        // this is better, there might be a question mark inside
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === name) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
