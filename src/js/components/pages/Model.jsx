import React, {PropTypes} from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FormContainer from '../global/FormContainer.jsx';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Categories from '../elements/Categories.jsx';
//import { selectYear } from '../../actions/vehicleActions';
import { getModel, selectType, selectYear, updateName } from '../../actions/modelActions';
import { getSpecifications } from '../../actions/specsActions';

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
            value: firstTab,
            specs: {},
            filename: ''
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
    };

    handleYearChange = (event, reactid, value) => {
        this.props.selectYear(value);
    };
    handleInputChange(event) {
        this.props.updateName(event.target.value);
    }
    handleTypeChange = (event, reactid, value) => {
        this.props.selectType(value);
    };

    componentDidMount() {
        /*
         */
        //this.serverRequest = $.get(this.props.source, function (result) {
        console.log('MOUNTED');
        if (this.state.mode === 'edit') {
            this.props.getModel(this.props.params.id, (data) => {});
            this.props.getSpecifications('accent');
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
        console.log(this.props);
        console.log(this.props.filename);
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
                                                   style={styles.textbox}
                                                   value={this.props.name}
                                                   onChange={this.handleInputChange.bind(this)}
                                                   floatingLabelText="Model name" />
                                        <br/>
                                    </FormContainer>
                                </div>
                            </Tab>
                            <Tab label="Specifications" value="b">
                                <div style={styles.inner}>
                                    <h2 style={styles.headline}>Specifications</h2>
                                    <FormContainer style={styles.wide} ref="formContainer2">
                                        <Categories data={this.props.specs} filename={this.props.filename} />
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
const mapStateToProps = state => ({
    selectedYear: state.model.selectedYear,
    selectedType: state.model.selectedType,
    name: state.model.name,
    specs: state.specifications.specs,
    filename: state.specifications.filename
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectYear,
    getModel,
    selectType,
    updateName,
    getSpecifications
}, dispatch);


ModelPage.propTypes = {
    textbox: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelPage);
