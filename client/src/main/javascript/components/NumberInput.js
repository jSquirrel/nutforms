import React from 'react';
import FormInput from './FormInput.js';
import * as AttributeActions from './../constants/AttributeActions.js';


export default class NumberInput extends FormInput {

    /**
     * NumberInput constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        let input;
        if (this.props.attribute.isPrimary()) {
            input = <input type="number"
                           className="form-control"
                           name={this.props.name}
                           value={this.state.value}
                           disabled="disabled"
            />;
        } else {
            input = <input type="number"
                           className="form-control"
                           name={this.props.name}
                           value={this.state.value}
                           onChange={this.handleChange}
                           onBlur={this.handleSave}
            />;
        }

        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.attribute.getFormLabel()}</label>
                {input}
            </div>
        )
    }

}
