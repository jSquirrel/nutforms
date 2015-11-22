import fetch from 'node-fetch';
import React from 'react';
import EntityMetadataFactory from './model/EntityMetadataFactory.js';
import EntityForm from './components/EntityForm.js';

// TODO: parametrize the entity name
let entityName = "cz.cvut.fel.nutforms.example.model.Bug";


function renderComponent(metadata) {

    let entityMetadata = EntityMetadataFactory.create(entityName, metadata, 'create');

}

// TODO: load data from API (/meta, /rule)
// TODO: parametrize URL of the api
// TODO: enable CORS (now ahs to be disabled via developer mode in browser)
fetch(`http://localhost:8080/meta/class/${entityName}`)
    .then(function (response) {
        return response.json()
    })
    .then(function (json) {
        renderComponent(json);
    })
    .catch(function (ex) {
        console.log('Loading entity metadata failed!', ex)
    });