import React from 'react';
import EntityRow from './EntityRow.js';


export default class EntityList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let headers = [];
        let entityRows = [];

        Object.keys(this.props.attributes).forEach((key) => {
            let attributeLabel = this.props.attributes[key].label;
            let header = <th>{attributeLabel}</th>;
            headers.push(header);
        });

        this.props.entities.forEach((entity) => {
            let entityRow = <EntityRow entity={entity} attributes={this.props.attributes}/>;
            entityRows.push(entityRow);
        });

        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>{headers}</tr>
                    </thead>
                    <tbody>
                    {entityRows}
                    </tbody>
                </table>
            </div>
        );
    }

}
