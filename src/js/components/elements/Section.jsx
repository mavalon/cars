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
            pkgs.forEach((pkg, x) => {
                let items = [];
                pkg.details.forEach((details, i) => {
                    const key = `p.${x}.${i}`;
                    items.push(<li key={key}>{details}</li>);
                });
                const key = `p.${x}`;
                let image = `http://hyundaiusa.com/${pkg.image}`;
                data.push(
                    <div key={key} className="package">
                        <img src={image} />
                        <h3>{pkg.title}</h3>
                        <h4>{pkg.total}</h4>
                        <ul>
                            {items}
                        </ul>
                    </div>
                );
            });
            html = <div className="packages container">{data}</div>;
        }
        return html;
    }

    warranties(warrantyArr) {
        let html;
        if (warrantyArr) {
            //console.log(warrantyArr);
            let data = [];
            warrantyArr.forEach((item, i) => {
                const key = `w.${i}`;
                let image = `http://hyundaiusa.com/${item}`;
                data.push(<div className="warranty" key={key}><img src={image} /></div>);
            });
            html = <div className="warranties container">{data}</div>;
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
            section.specifications.forEach((spec, s) => {
                if (spec.packages) pkgs = spec.packages;

                let trims = [];
                spec.trims.forEach((item, t) => {
                    let key = `${s}.${t}`;
                    trims.push(<TableHeaderColumn className="trims" key={key}>{item}</TableHeaderColumn>);
                });

                let rows = [];
                spec.specs.forEach((feature, n) => {
                    let key = `${s}.${n}.0.0`;
                    let cells = [];

                    feature.trims.forEach((value, r) => {
                        let key = `${s}.${n}.${r}`;
                        cells.push(<TableRowColumn title={spec.trims[r].name} key={key}><span onClick={this.props.onValueClick.bind(this, feature.trims[r].value)}>{feature.trims[r].value}</span></TableRowColumn>);
                    });

                    key = `${s}.${n}`;
                    rows.push(<TableRow className="specRow" selectable={false} key={key}>
                        <TableRowColumn title={feature.name}>{feature.name}</TableRowColumn>
                        {cells}
                    </TableRow>);
                });

                let table =
                    <Table className="info" key={s}>
                        <TableHeader className="headerRow" displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn className="subsectionName">{spec.name}</TableHeaderColumn>
                                {trims}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="specBody" displayRowCheckbox={false}>
                            {rows}
                        </TableBody>
                    </Table>;

                info.push(table);
            });
        }
        return (
            <div className="section">
                <h3>{section.category}</h3>
                <div className="specsTables">
                {info}
                </div>
                {this.packages(pkgs)}
                {this.warranties(wtys)}
            </div>
        );
    }
}
