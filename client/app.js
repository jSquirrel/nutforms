import React from 'react';
import EntityForm from './components/EntityForm.js';
import {metadata} from './components/metadata.js'
// TODO: load metadata from API /meta endpoint


React.render(
    <EntityForm metadata={metadata} />,
    document.getElementById('form')
);
