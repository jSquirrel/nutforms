import React from 'react';
import EntityFormActions from './../actions/EntityFormActions.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';
import * as AttributeActions from './../constants/AttributeActions.js';


export default class EntityForm extends React.Component {

    /**
     * EntityForm constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.model = props.model;
        this.state = {data: {}, sections: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handles onChange event of any EntityForm's field.
     * Called by the field component.
     *
     * @param {Attribute} attribute
     * @param {string} name
     * @param {*} value
     */
    onFieldChange(attribute, name, value) {
        console.log("onFieldChange this", this);
        EntityFormActions.fieldChanged(attribute, name, value);
    }

    /**
     * Handles onBlur event of any EntityForm's field.
     * Called by the field component.
     *
     * @param {Attribute} attribute
     * @param {string} name
     * @param {*} value
     */
    onFieldSave(attribute, name, value) {
        console.log("onFieldSave this", this);
        EntityFormActions.fieldSaved(attribute, name, value);
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

        EntityFormActions.formSubmitted(this.model, values);
    }

    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {

        let sections = {};
        Object.keys(this.model.attributes).forEach((key) => {
            let attribute = this.model.attributes[key];
            attribute.listen(AttributeActions.FIELD_CHANGED, this.onAttributeChanged);

            switch (attribute.type) {
                case "java.lang.String":
                    sections[attribute.name] =
                        <TextInput
                            attribute={attribute}
                            name={attribute.name}
                            key={attribute.name}
                            onChange={this.onFieldChange}
                            onSave={this.onFieldSave}
                            ref={attribute.name}
                        />;
                    return;

                case "java.lang.Long":
                    sections[attribute.name] =
                        <NumberInput
                            attribute={attribute}
                            name={attribute.name}
                            key={attribute.name}
                            onChange={this.onFieldChange}
                            onSave={this.onFieldSave}
                            ref={attribute.name}
                        />;
                    return;
            }
        });

        // TODO: relations

        this.sections = sections;

        return (
            <form role="form">
                {sections}
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
            </form>
        );
    }

    /**
     * Callback for when attribute changes.
     *
     * @param {Attribute} attribute
     */
    onAttributeChanged(attribute) {
        console.log(`EntityForm.onAttributeChanged() called`, attribute);
    }

}

/**
 * Property types definition for EntityForm.
 *
 * @type {object}
 */
EntityForm.propTypes = {
    model: React.PropTypes.object.isRequired
};
