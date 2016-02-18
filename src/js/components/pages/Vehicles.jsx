import React, {PropTypes} from 'react';

import BaseComponent from '../BaseComponent.jsx';

import { updateYears, getYears, getModels, selectModel, getTrims, selectTrim } from '../../actions/vehicleActions.js';

import Page from '../hoc/Page.jsx';
import FormContainer from '../global/FormContainer.jsx';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';

import {H1} from '../../theme/GenericTheme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


require('./Login.scss');


/** Class representing the Login Component
 * @extends BaseComponent
 * */
class Vehicles extends BaseComponent {

    constructor() {
        super(...arguments);

        //this.isPage = LOGIN_PAGE;
        let d = new Date();
        let thisYear = d.getFullYear();

        this.state = {
            selectedYear: 0,
            selectedModel: 0,
            selectedTrim: 0
        };
    }

    componentDidMount() {
        this.props.getYears();
        //this.props.getModels();
        //this.props.getTrims();
    }

    /*
     */
    componentWillReceiveProps(nextProps) {
        /*
        if (this.props.selectedYear !== nextProps.selectedYear) {
            console.log('getModels');
            this.props.getModels();
        }
        if (this.props.selectedModel !== nextProps.selectedModel) {
            console.log('getTrims');
            this.props.getTrims();
        }
        if (this.props.models !== nextProps.models) {
            if (nextProps.models.length > 0) {
                console.log('new models');
                this.setState({selectedModel: nextProps.models[0].id});
            }
        }
        if (this.props.years !== nextProps.years) {
            if (nextProps.years.length > 0) {
                console.log('new years');
                this.setState({selectedYear: nextProps.years[0]});
            }
        }
        if (this.props.trims !== nextProps.trims) {
            if (nextProps.trims.length > 0) {
                console.log('new trims');
                this.setState({selectedTrim: nextProps.trims[0].id});
            }
        }
        */
    }

    componentWillUpdate() {
        //console.log('updating', this.state);
    }

    handleYearChange = (event, index, value) => {
        this.setState({selectedYear: value});
        this.setState({selectedModel: 0});
        this.setState({selectedTrim: 0});
        this.props.getModels(value);
        this.props.getTrims('0');
    };

    handleModelChange = (event, index, value) => {
        this.setState({selectedModel: value});
        this.setState({selectedTrim: 0});
        //this.props.getYears();
        this.props.getTrims(value);
    };

    handleTrimChange = (event, index, value) => {
        console.log('trim id');
        console.log(value);
        this.setState({selectedTrim: value});
    };

    render() {
        const paperStyle = {
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 50,
            padding: '20px 0',
            alignItems: 'center'
        };

        const padBottom = {
            marginBottom: 25
        };

        const years = this.props.years.map(year => <MenuItem key={year} value={year} primaryText={year}/>);
        const models = this.props.models.map(model => <MenuItem key={model._id} value={model._id} primaryText={model.name}/>);
        const trims = this.props.trims.map(trim => <MenuItem key={trim._id} value={trim._id} primaryText={trim.name}/>);

        const yearsWithLabel = [<MenuItem key={0} value={0} primaryText="Year"/>, ...years];
        const modelsWithLabel = [<MenuItem key={0} value={0} primaryText="Model"/>, ...models];
        const trimsWithLabel = [<MenuItem key={0} value={0} primaryText="Trim"/>, ...trims];

        return (
            <div className="row middle-xs center-xs">
                <div className="col-xs-12 col-sm-4">
                    <Paper
                        style={paperStyle}
                        zDepth={1}
                    >
                        <h1 style={H1}>Vehicles</h1>
                        <FormContainer ref="formContainer" style={padBottom}>
                            <DropDownMenu value={this.state.selectedYear} onChange={this.handleYearChange}>
                                {yearsWithLabel}
                            </DropDownMenu>
                            <DropDownMenu disabled={this.props.models.length < 2} value={this.state.selectedModel} onChange={this.handleModelChange}>
                                {modelsWithLabel}
                            </DropDownMenu>
                            <DropDownMenu disabled={this.props.trims.length < 2} value={this.state.selectedTrim} onChange={this.handleTrimChange}>
                                {trimsWithLabel}
                            </DropDownMenu>
                        </FormContainer>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    years: state.vehicles.years,
    models: state.vehicles.models,
    trims: state.vehicles.trims,

    selectedYear: state.vehicles.selectedYear,
    selectedModel: state.vehicles.selectedModel,
    selectedTrim: state.vehicles.selectedTrim
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateYears,
    getYears,
    getModels,
    getTrims,
    selectModel,
    selectTrim
}, dispatch);


/*
 Vehicles.propTypes = {
 years: PropTypes.array,
 model: PropTypes.string
 };

 */

export default connect(mapStateToProps, mapDispatchToProps)(
    Page(Vehicles)
);
