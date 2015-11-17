import fetch from 'node-fetch';
import React from 'react';
import Model from './model/Model.js';
import ApiHandler from './api/ApiHandler.js';
import EntityForm from './components/EntityForm.js';
import ModelFactory from './model/ModelFactory.js';

let id = 1;
let className = "cz.cvut.fel.nutforms.example.model.Bug";
let contextLocation = "account";
let bindElementId = 'form';

// TODO: move this to a library function
((className, contextLocation, bindElementId, entityId) => {

    let apiHandler = new ApiHandler('http://localhost:8080/', 'admin', '1234');
    apiHandler.fetchMetadataFor(className).then((results) => {
        let metadata = results[0];
        apiHandler.fetchDataFor(className, entityId).then((data) => {
            let modelFactory = new ModelFactory();
            let model = modelFactory.create(className, entityId, metadata, data);
            React.render(
                <EntityForm model={model}/>,
                document.getElementById(bindElementId)
            );
        });
    });
})(className, contextLocation, bindElementId, id);
