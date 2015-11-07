import React from 'react';
import EntityMetadataFactory from './model/EntityMetadataFactory.js';
import EntityForm from './components/EntityForm.js';
import {metadata} from './components/metadata.js'

// TODO: load data from API (/meta, /rule)

let entityName = "cz.cvut.fel.nutforms.example.model.Bug";
let entityMetadata = EntityMetadataFactory.create(entityName, metadata);

React.render(
    <EntityForm metadata={entityMetadata} />,
    document.getElementById('form')
);
