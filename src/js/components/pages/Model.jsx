import React, {PropTypes} from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FormContainer from '../global/FormContainer.jsx';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
//import { selectYear } from '../../actions/vehicleActions';
import { getModel, selectType, selectYear } from '../../actions/modelActions';

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
        padding: '0 20px',
        width: '100%'
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
    },
    wide: {
        width: '100%'
    }
};

export default class ModelPage extends React.Component {

    constructor(props) {
        super(props);

        const mode = (props.params.id) ? 'edit' : 'add';
        const firstTab = (props.params.id) ? 'b' : 'a';
        const today = new Date();
        const year = (props.params.year) ? props.params.year : today.getFullYear();
        //console.log(parseInt(year, 10));

        this.state = {
            selectedYear: parseInt(year, 10),
            selectedType: 0,
            mode: mode,
            value: firstTab
        };
        /*
        this.state = {
            value: firstTab,
            name: '',
            model: {
                year: parseInt(year, 10),
                name: '',
                type: 0
            }
        };
        */
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
    };

    handleYearChange = (event, reactid, value) => {
        this.setState({selectedYear: value});
        this.props.selectYear(value);
        /*
        console.log('handleYear');
        console.log(this);
        */
    };

    handleTypeChange = (event, reactid, value) => {
        this.setState({selectedType: value});
        this.props.selectType(value);
    };

    componentDidMount() {
        console.log('---- console ----');
        console.log(this);
        console.log(this.props);
        console.log(this.state);
        console.log('---- console ----');
        if (this.state.mode === 'edit') {
            this.setState({selectedYear: this.state.selectedYear, model: this.state.model});
            this.props.selectYear(this.state.selectedYear);
            //console.log('getmodel');
            this.props.getModel(this.props.params.id);
            this.refs.textbox.value = this.props.name;
        } else {
            const today = new Date();
            const year = (this.props.params.year) ? this.props.params.year : today.getFullYear();

            this.setState({selectedYear: parseInt(year, 10)});
            this.props.selectYear(parseInt(year, 10));
        }
    }

    valueChanged(obj) {
        return (e) => {
            console.log(obj);
            console.log(e);
        };
    }

    render() {
        const today = new Date();
        const from = today.getFullYear() - 3;
        const to = today.getFullYear() + 3;
        let years = [];
        for (let y = from; y <= to; y++) years.push(y);

        const yearsList = years.map(year => <MenuItem style={styles.listItem} key={year} value={year} primaryText={year}/>);
        const arr = [1, 2, 3].map(hello => <p key={hello}>Test</p>);

        /*
        console.log(this);
        console.log(this.state);
        console.log(this.props);
         console.log('--- state ----');
         console.log(this);
         console.log(this.props.selectedYear);
         console.log('selectedyear');
        */
        return (
            <div className="row middle-xs center-xs">
                <div style={styles.outer}>
                    <Paper
                        style={styles.paperStyle}
                        zDepth={1}
                    >
                        <Tabs
                            style={styles.wide}
                        >
                            <Tab label="Basic Info" value="a" >
                                <div style={styles.inner}>
                                    <h2 style={styles.headline}>Basic Info</h2>
                                    <FormContainer ref="formContainer">
                                        <DropDownMenu style={styles.list} value={this.props.selectedYear} onChange={this.handleYearChange}>
                                            {yearsList}
                                        </DropDownMenu>
                                        <br/>
                                        <DropDownMenu style={styles.listItem} value={this.props.selectedType} onChange={this.handleTypeChange}>
                                            <MenuItem style={styles.listItem} value={0} primaryText="Vehicle Type" />
                                            <MenuItem style={styles.listItem} value="SUV" primaryText="SUV" />
                                            <MenuItem style={styles.listItem} value="Sedan" primaryText="Sedan" />
                                        </DropDownMenu>
                                        <br/>
                                        <TextField ref="textbox"
                                                   onChange={this.valueChanged}
                                                   style={styles.textbox}
                                                   floatingLabelText="Model name" />
                                        <br/>
                                    </FormContainer>
                                </div>
                            </Tab>
                            <Tab label="Specifications" value="b">
                                <div style={styles.inner}>
                                    <h2 style={styles.headline}>Specifications</h2>
                                    <FormContainer style={styles.wide} ref="formContainer2">
                                        {arr}
                                    </FormContainer>
                                </div>
                            </Tab>
                        </Tabs>
                    </Paper>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    /*
    console.log('map');
    console.log(state);
    */
    return {
        selectedYear: state.model.selectedYear,
        selectedType: state.model.selectedType,
        name: state.model.name
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({
    selectYear,
    getModel,
    selectType
}, dispatch);


ModelPage.propTypes = {
    textbox: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage);
