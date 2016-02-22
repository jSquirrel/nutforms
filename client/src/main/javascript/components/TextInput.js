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
        for (let info in this.state.validationInfo) {
            if (this.state.validationInfo.hasOwnProperty(info)) {
                infos.push((
                    <div class="validation-info">{this.state.validationInfo[info]}</div>
                ));
            }
        }

        let errors = [];
        for (let error in this.state.validationErrors) {
            if (this.state.validationErrors.hasOwnProperty(error)) {
                infos.push((
                    <div class="validation-error">{this.state.validationErrors[error]}</div>
                ));
            }
        }

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
