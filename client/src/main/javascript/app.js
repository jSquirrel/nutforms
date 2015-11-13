import fetch from 'node-fetch';
import React from 'react';
import Model from './model/Model.js';
import EntityForm from './components/EntityForm.js';
import ModelFactory from './model/ModelFactory.js';

// TODO: load from API
let id = 1;
let className = "cz.cvut.fel.nutforms.example.model.Bug";
let metadata = {
    "attributes": [
        {
            "name": "description",
            "type": "java.lang.String",
            "is_primary": false
        },
        {
            "name": "log",
            "type": "java.lang.String",
            "is_primary": false
        },
        {
            "name": "id",
            "type": "java.lang.Long",
            "is_primary": true
        },
        {
            "name": "localizedDescription",
            "type": "java.lang.String",
            "is_primary": false
        }
    ],
    "relationships": [
        {
            "name": "project",
            "type": "ToOne",
            "target_entity": "cz.cvut.fel.nutforms.example.model.Project"
        }
    ]
};
let entityName = "cz.cvut.fel.nutforms.example.model.Bug";
let data = {
    "description": "Lorem Ipsum",
    "log": "Lorem Ipsum",
    "id": 1,
    "localizedDescription": "Lorem Ipsum",
    "project": 1
};
let contextLocation = "account";

(function (entity, contextPath) {

    let modelFactory = new ModelFactory();
    let model = modelFactory.create(className, id, metadata, data);
    React.render(
        <EntityForm model={model}/>,
        document.getElementById('form')
    );
})(entityName, contextLocation);
