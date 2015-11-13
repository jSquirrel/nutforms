import React from 'react';


export default class TextInput extends React.Component {

    /**
     * TextInput constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
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
        console.log(`TextInput (${this.props.name}) value changed to: ${event.target.value}`);
        this.props.onChange(this.props.attribute, this.props.name, event.target.value);
        this.setState({value: event.target.value});
    }

    /**
     * Handles onBlur event.
     *
     * @param {object} event
     */
    handleSave(event) {
        console.log(`TextInput (${this.props.name}) value saved to: ${event.target.value}`);
        this.props.onSave(this.props.attribute, this.props.name, event.target.value);
        this.setState({value: event.target.value});
    }

    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <input type="text"
                       className="form-control"
                       name={this.props.name}
                       value={this.state.value}
                       onChange={this.handleChange}
                       onBlur={this.handleSave}
                />
            </div>
        )
    }

}

/**
 * Property types definition for TextInput.
 *
 * @type {object}
 */
TextInput.propTypes = {
    attribute: React.PropTypes.object.isRequired
    , name: React.PropTypes.string.isRequired
    , value: React.PropTypes.number
    , onChange: React.PropTypes.func.isRequired
    , onSave: React.PropTypes.func.isRequired
};
