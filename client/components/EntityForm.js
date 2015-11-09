import React from 'react';
import EntityFormActions from './../actions/EntityFormActions.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';


export default class EntityForm extends React.Component {

    /**
     * EntityForm constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {data: {}, sections: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handles onChange event of any EntityForm's field.
     * Called by the field component.
     *
     * @param {string} name
     * @param {*} value
     */
    onFieldChange(name, value) {
        //this.state.data[name] = value;
        EntityFormActions.fieldChanged(name, value);
    }

    /**
     * Handles onBlur event of any EntityForm's field.
     * Called by the field component.
     *
     * @param {string} name
     * @param {*} value
     */
    onFieldSave(name, value) {
        //this.state.data[name] = value;
        EntityFormActions.fieldSaved(name, value);
    }

    /**
     * Handles EntityForm onSubmit event.
     *
     * @param {object} event
     */
    handleSubmit(event) {
        event.preventDefault();

        // TODO: mby there is a better solution?
        let values = {};
        Object.keys(this.refs).forEach((key) => {
            values[key] = this.refs[key].state.value;
        });

        console.log('EntityForm submitted with values: ', values);

        EntityFormActions.formSubmitted(values);
    }

    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {

        let sections = {};

        /** @var {EntityMetadata} metadata */
        let metadata = this.props.metadata;

        metadata.getFields().forEach((attribute) => {

            switch (attribute.getType()) {
                case "java.lang.String":
                    sections[attribute.getName()] =
                        <TextInput
                            name={attribute.getName()}
                            key={attribute.getName()}
                            onChange={this.onFieldChange}
                            onSave={this.onFieldSave}
                            ref={attribute.getName()}
                        />;
                    return;

                case "java.lang.Long":
                    sections[attribute.getName()] =
                        <NumberInput
                            name={attribute.getName()}
                            key={attribute.getName()}
                            onChange={this.onFieldChange}
                            onSave={this.onFieldSave}
                            ref={attribute.getName()}
                        />;
                    return;
            }

        });

        this.sections = sections;

        return (
            <form role="form">
                {sections}
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
            </form>
        );
    }

}

/**
 * Property types definition for EntityForm.
 *
 * @type {object}
 */
EntityForm.propTypes = {
    entityMetadata: React.PropTypes.object.isRequired
};
