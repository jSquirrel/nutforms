import React from 'react';

export default class EntityForm extends React.Component {
    render() {

        let sections = [];
        let metadata = this.props.metadata;

        metadata.attributes.forEach((attribute) => {

            switch (attribute.type) {
                case "java.lang.String":
                    sections.push(<TextInput name={attribute.name}/>);
                    return;

                case "java.lang.Long":
                    sections.push(<NumberInput name={attribute.name}/>);
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
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <input type="text" className="form-control" name={this.props.name} />
            </div>
        )
    }
}

class NumberInput extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <input type="number" className="form-control" name={this.props.name} />
            </div>
        )
    }
}
