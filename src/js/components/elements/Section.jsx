import React from 'react';

const styles = {
    table: {
        width: '100%',
        padding: '20px 0'
    },
    th: {
        textAlign: 'left'
    },
    td: {
        fontSize: '11px'
    }
};
export default class ModelPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let section = this.props.section;
        let info = [];

        if (section.specifications) {
            for (let s = 0; s < section.specifications.length; s++) {
                let spec = section.specifications[s];

                let trims = [];
                for (let t = 0; t < spec.trims.length; t++) {
                    let key = `${s}.${t}`;
                    trims.push(<th style={styles.th} key={key}>{spec.trims[t]}</th>);
                }

                let rows = [];
                for (let n = 0; n < spec.specs.length; n++) {
                    let feature = spec.specs[n];
                    let key = `${s}.${n}.0.0`;
                    let cells = [];

                    for (let r = 0; r < feature.trims.length; r++) {
                        let key = `${s}.${n}.${r}`;
                        cells.push(<td style={styles.td} title={spec.trims[r].name} key={key}>{feature.trims[r].value}</td>);
                    }
                    key = `${s}.${n}`;
                    rows.push(<tr key={key}>
                            <td style={styles.td}>{feature.name}</td>
                            {cells}
                        </tr>);
                }

                let table =
                    <table key={s} style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>{spec.name}</th>
                                {trims}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>;

                info.push(table);
            }
        }
        return (
            <div>
                {section.category}
                {info}
            </div>
        );
    }
}
