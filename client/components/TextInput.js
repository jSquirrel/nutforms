import React from 'react';


export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
        // TODO: load field value from EntityMetadata
        // this.state = {value: 'Hello!'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        console.log(`TextInput (${this.props.name}) value changed to: ${event.target.value}`);
        this.props.onChange(this.props.name, event.target.value);
        this.setState({value: event.target.value});
    }

    handleSave(event) {
        console.log(`TextInput (${this.props.name}) value saved to: ${event.target.value}`);
        this.props.onSave(this.props.name, event.target.value);
        this.setState({value: event.target.value});
    }

    // TODO: handleSubmit?

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
