import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

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

    packages(pkgs) {
        let html;
        if (pkgs) {
            let data = [];
            for (let x = 0; x < pkgs.length; x++) {
                let pkg = pkgs[x];
                let items = [];
                for (let i = 0; i < pkg.details.length; i++) {
                    items.push(<li>{pkg.details[i]}</li>);
                }
                let image = `http://hyundaiusa.com/${pkg.image}`;
                data.push(
                    <div className="package">
                        <img src={image} />
                        <h3>{pkg.title}</h3>
                        <h4>{pkg.total}</h4>
                        <ul>
                            {items}
                        </ul>
                    </div>
                );
            }
            html = <div className="container">{data}</div>;
        }
        return html;
    }

    warranties(warrantyArr) {
        let html;
        if (warrantyArr) {
            console.log(warrantyArr);
            let data = [];
            for (let x = 0; x < warrantyArr.length; x++) {
                let image = `http://hyundaiusa.com/${warrantyArr[x]}`;
                data.push(<div className="warranty"><img src={image} /></div>);
            }
            html = <div className="container">{data}</div>;
        }
        return html;
    }

    render() {
        let section = this.props.section,
            info = [],
            pkgs = null,
            wtys = null;

        if (section.warranties) wtys = section.warranties;
        if (section.specifications) {
            for (let s = 0; s < section.specifications.length; s++) {
                let spec = section.specifications[s];
                if (spec.packages) pkgs = spec.packages;

                let trims = [];
                for (let t = 0; t < spec.trims.length; t++) {
                    let key = `${s}.${t}`;
                    trims.push(<TableHeaderColumn key={key}>{spec.trims[t]}</TableHeaderColumn>);
                }

                let rows = [];
                for (let n = 0; n < spec.specs.length; n++) {
                    let feature = spec.specs[n];
                    let key = `${s}.${n}.0.0`;
                    let cells = [];

                    for (let r = 0; r < feature.trims.length; r++) {
                        let key = `${s}.${n}.${r}`;
                        cells.push(<TableRowColumn title={spec.trims[r].name} key={key}>{feature.trims[r].value}</TableRowColumn>);
                    }
                    key = `${s}.${n}`;
                    rows.push(<TableRow selectable={false} key={key}>
                            <TableRowColumn title={feature.name}>{feature.name}</TableRowColumn>
                            {cells}
                        </TableRow>);
                }

                let table =
                    <Table key={s}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>{spec.name}</TableHeaderColumn>
                                {trims}
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {rows}
                        </TableBody>
                    </Table>;

                info.push(table);
            }
        }
        return (
            <div>
                <h3>{section.category}</h3>
                {info}
                {this.packages(pkgs)}
                {this.warranties(wtys)}
            </div>
        );
    }
}
