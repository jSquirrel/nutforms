import React from 'react';


export default class EntityRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cols = [];
        Object.keys(this.props.attributes).forEach((key) => {
            let col;
            let attribute = this.props.attributes[key];
            let value = this.props.entity[key];

            if (attribute.hasOwnProperty("href")) {
                let href = attribute.href.replace("<value>", value);
                col = (
                    <td>
                        <a href={href}>{value}</a>
                    </td>
                );
            } else {
                col = (<td>{value}</td>);
            }

            cols.push(col);
        });

        return (
            <tr>
                {cols}
            </tr>
        );
    }

}
