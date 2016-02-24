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
        this.state = {value: this.props.attribute.value};
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
        this.setState({value: attribute.value});
    }

    /**
     * Handles AttributeActions.ATTRIBUTE_VALIDATED.
     *
     * @param {Attribute} attribute
     */
    onAttributeValidated(attribute) {
        this.props.attribute.validation.update(attribute.validation);
        this.forceUpdate(); // toDo: do this in a better way
        //this.setState({
        //    validationErrors: FormInput._updateValidationState(this.state.validationErrors, attribute.validation.errors,
        //        attribute.validation.rule),
        //    validationInfo: FormInput._updateValidationState(this.state.validationInfo, attribute.validation.info,
        //        attribute.validation.rule)
        //});
    }

    /**
     * Merges current component state with received changes and returns the new state (without calling
     * <code>this#setState()</code>)
     *
     * @param {object} oldState current component state
     * @param {object} newState received object
     * @param {string} ruleName the name of the validation rule
     * @returns {object} new component state
     * @private
     */
    static _updateValidationState(oldState, newState, ruleName) {
        let updated = Object.assign({}, oldState);
        updated[`${ruleName}`] = newState;
        for (let attr in updated) {
            if (updated.hasOwnProperty(attr) && updated[attr] === null) {
                delete updated[attr];
            }
        }
        return updated;
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
