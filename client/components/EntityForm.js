import React from 'react';
import EntityFormActions from './../actions/EntityFormActions.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';


export default class EntityForm extends React.Component {

    onFieldChange(name, value) {
        EntityFormActions.fieldChanged(name, value);
    }

    onFieldSave(name, value) {
        EntityFormActions.fieldSaved(name, value);
    }

    // TODO: onSubmit? onFieldSubmit?

    render() {

        let sections = [];

        /** @var {EntityMetadata} metadata */
        let metadata = this.props.metadata;

        metadata.getFields().forEach((attribute) => {

            switch (attribute.getType()) {
                case "java.lang.String":
                    sections.push(
                        <TextInput
                            name={attribute.getName()}
                            key={attribute.getName()}
                            onChange={this.onFieldChange}
                            onSave={this.onFieldSave}
                        />
                    );
                    return;

                case "java.lang.Long":
                    sections.push(
                        <NumberInput
                            name={attribute.getName()}
                            key={attribute.getName()}
                            onChange={this.onFieldChange}
                            onSave={this.onFieldSave}
                        />
                    );
                    return;
            }

        });

        return (
            <form role="form">
                {sections}
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        );
    }

}
