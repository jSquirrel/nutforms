import React from 'react';

export default class EntityForm extends React.Component {

    render() {

        let sections = [];

        /** @var {EntityMetadata} metadata */
        let metadata = this.props.metadata;

        metadata.getFields().forEach((attribute) => {

            switch (attribute.getType()) {
                case "java.lang.String":
                    sections.push(<TextInput name={attribute.getName()} key={attribute.getName()}/>);
                    return;

                case "java.lang.Long":
                    sections.push(<NumberInput name={attribute.getName()} key={attribute.getName()}/>);
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

class TextInput extends React.Component {

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <input type="text" className="form-control" name={this.props.name}/>
            </div>
        )
    }
}

class NumberInput extends React.Component {

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <input type="number" className="form-control" name={this.props.name}/>
            </div>
        )
    }

}
