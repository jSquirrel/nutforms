import React from 'react';
import * as AttributeActions from './../constants/AttributeActions.js';


export default class FormInput extends React.Component {

    /**
     * FormInput constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.props.attribute.listen(AttributeActions.VALUE_CHANGED, this);
        this.props.attribute.listen(AttributeActions.ATTRIBUTE_VALIDATED, this);
        this.state = {value: this.props.attribute.value, validationErrors: [], validationInfo: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    /**
     * Handles onChange event.
     *
     * @param {object} event
     */
    handleChange(event) {
        //console.log(`FormInput (${this.props.name}) value changed to: ${event.target.value}`);
        this.props.onChange(this.props.attribute, this.props.name, event.target.value);
        this.setState({value: event.target.value});
    }

    /**
     * Handles onBlur event.
     *
     * @param {object} event
     */
    handleSave(event) {
        console.log("Handle save this", this);
        //console.log(`TextInput (${this.props.name}) value saved to: ${event.target.value}`);
        this.props.onSave(this.props.attribute, this.props.name, event.target.value);
        this.setState({value: event.target.value});
    }

    /**
     * Observer update function implementation.
     *
     * @param {string} eventName
     * @param {Attribute} attribute
     */
    update(eventName, attribute) {
        switch (eventName) {
            case AttributeActions.VALUE_CHANGED:
                this.onAttributeValueChanged(attribute);
                break;

            case AttributeActions.ATTRIBUTE_VALIDATED:
                this.onAttributeValidated(attribute);
                break;

            default:
        }
    }

    /**
     * Handles AttributeActions.VALUE_CHANGED.
     *
     * @param {Attribute} attribute
     */
    onAttributeValueChanged(attribute) {
        console.log("onAttributeValueChanged this", this);
        this.setState({value: attribute.value});
    }

    /**
     * Handles AttributeActions.ATTRIBUTE_VALIDATED.
     *
     * @param {Attribute} attribute
     */
    onAttributeValidated(attribute) {
        // TODO: revise this when Validation is implemented
        this.setState({validationErrors: attribute.validation.errors, validationInfo: attribute.validation.info});
    }

    render() {
        return <div></div>;
    }

}

/**
 * Property types definition for TextInput.
 *
 * @type {object}
 */
FormInput.propTypes = {
    attribute: React.PropTypes.object.isRequired
    , name: React.PropTypes.string.isRequired
    , value: React.PropTypes.number
    , onChange: React.PropTypes.func.isRequired
    , onSave: React.PropTypes.func.isRequired
};
