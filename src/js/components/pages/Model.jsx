import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FormContainer from '../global/FormContainer.jsx';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { selectYear } from '../../actions/vehicleActions.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    paperStyle: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
        alignItems: 'center'
    },
    padBottom: {
        marginBottom: 25
    },
    outer: {
        padding: '0 20px'
    },
    inner: {
        padding: '10px'
    },
    listItem: {
        width: '256px',
    },
    list: {
        width: '256px',
        padding: '10px 0'
    },
    textbox: {
        width: '240px',
        padding: '10px 0 10px 25px'
    }
};

export default class ModelPage extends React.Component {

    constructor(props) {
        super(props);

        const mode = (props.params.id) ? 'edit' : 'add';
        const firstTab = (props.params.id) ? 'b' : 'a';
        const today = new Date();
        const year = (props.params.year) ? props.params.year : today.getFullYear();

        this.state = {
            value: firstTab,
            mode: mode,
            selectedYear: parseInt(year, 10),
            selectedType: 0
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
    };

    handleYearChange = (event, reactid, value) => {
        this.setState({selectedYear: value});
        this.props.selectYear(value);
    };

    handleTypeChange = (event, reactid, value) => {
        this.setState({selectedType: value});
    };

    componentDidMount() {
        if (this.state.mode === 'edit') {
            this.setState({selectedYear: this.state.selectedYear});
            this.props.selectYear(this.state.selectedYear);
        }
    }

    render() {
        const today = new Date();
        const from = today.getFullYear() - 3;
        const to = today.getFullYear() + 3;
        let years = [];
        for (let y = from; y <= to; y++) years.push(y);

        const yearsList = years.map(year => <MenuItem style={styles.listItem} key={year} value={year} primaryText={year}/>);

        return (
            <div className="row middle-xs center-xs">
                <div style={styles.outer}>
                    <Paper
                        style={styles.paperStyle}
                        zDepth={1}
                    >
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <Tab label="Basic Info" value="a" >
                                <div style={styles.inner}>
                                    <h2 style={styles.headline}>Basic Info</h2>
                                    <div>
                                        <DropDownMenu style={styles.list} autoWidth="false" value={this.state.selectedYear} onChange={this.handleYearChange}>
                                            {yearsList}
                                        </DropDownMenu>
                                        <br/>
                                        <DropDownMenu style={styles.listItem} autoWidth="false" value={this.state.selectedType} onChange={this.handleTypeChange}>
                                            <MenuItem style={styles.listItem} value={0} primaryText="Vehicle Type" />
                                            <MenuItem style={styles.listItem} value="SUV" primaryText="SUV" />
                                            <MenuItem style={styles.listItem} value="Sedan" primaryText="Sedan" />
                                        </DropDownMenu>
                                        <br/>
                                        <TextField style={styles.textbox} floatingLabelText="Model name" />
                                        <br/>
                                    </div>
                                </div>
                            </Tab>
                            <Tab label="Specifications" value="b">
                                <div style={styles.inner}>
                                    <h2 style={styles.headline}>Specifications</h2>
                                    <p>
                                        This is another example of a controllable tab. Remember, if you
                                        use controllable Tabs, you need to give all of your tabs values or else
                                        you wont be able to select them.
                                    </p>
                                </div>
                            </Tab>
                        </Tabs>
                    </Paper>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    //selectedYear: state.vehicles.selectedYear,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    selectYear
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage);
