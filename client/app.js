import fetch from 'node-fetch';
import React from 'react';
import EntityMetadataFactory from './model/entity/EntityMetadataFactory.js';
import ContextFactory from './model/context/ContextFactory.js';
import Model from './model/Model.js';
import EntityForm from './components/EntityForm.js';

// TODO: parametrize the entity name
let entityName = "cz.cvut.fel.nutforms.example.model.Bug";
let contextLocation = "account";

function renderComponent(entity, contextPath) {

    let entityMetadata = EntityMetadataFactory.create(entity);
    let context = ContextFactory.create(contextPath);
    Promise.all([entityMetadata, context])
        .then(function (values) {
            // toDo: ensure that return values are ordered correctly
            React.render(
                <EntityForm model={new Model(values[0], values[1])}/>,
                document.getElementById('form')
            );


        })
}

renderComponent(entityName, contextLocation);
