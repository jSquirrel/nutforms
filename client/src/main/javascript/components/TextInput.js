import React from 'react';
import FormInput from './FormInput.js';
import * as AttributeActions from './../constants/AttributeActions.js';


export default class TextInput extends FormInput {

    /**
     * TextInput constructor.
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

        let infos = [];
        this.state.validationInfo.forEach((info) => {
            infos.push((
                <span class="validation-info">{info}</span>
            ));
        });

        let errors = [];
        this.state.validationErrors.forEach((error) => {
            infos.push((
                <span class="validation-error">{error}</span>
            ));
        });

        let input;
        if (this.props.attribute.isPrimary()) {
            input = <input type="text"
                           className="form-control"
                           name={this.props.name}
                           value={this.state.value}
                           disabled="disabled"
            />;
        } else {
            input = <input type="text"
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
                {errors}
                {infos}
            </div>
        )
    }

}
