import React from 'react';

export default class ModelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let section = this.props.section;
        let specs = [];

        if (section.specifications) {
            for (let s = 0; s < section.specifications.length; s++) {
                let spec = section.specifications[s];

                let trims = [];
                for (let t = 0; t < spec.trims.length; t++) {
                    let key = `${s}.${t}`;
                    trims.push(<th key={key}>{spec.trims[t]}</th>);
                }

                let table =
                    <table key={s}>
                        <thead>
                            <tr>
                                <th>{spec.name}</th>
                                {trims}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>;

                specs.push(table);
            }
        }
        return (
            <div>
                {section.category}
                {specs}
            </div>
        );
    }
}
