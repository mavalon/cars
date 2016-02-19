import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentCut from 'material-ui/lib/svg-icons/content/content-cut';
import MapDirectionsCar from 'material-ui/lib/svg-icons/maps/directions-car';
import { doAction, selectModel, selectTrim, selectYear } from '../../actions/vehicleActions.js';

let router = require('../../Router.jsx');

const styles = {
    button: {
        margin: 12
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
    }
};

class VehicleActions extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedModel: 0,
            selectedYear: 0,
            selectedTrim: 0
        };
    }
    handleTrimClick = (event, reactid, value) => {
        if (this.props.selectedTrim !== 0) {
            window.location = `/trim/edit/${this.props.selectedTrim}`;
        } else {
            window.location = `/trim/add/${this.props.selectedModel}`;
        }
    };
    handleModelClick = (event, reactid, value) => {
        if (this.props.selectedModel !== 0) {
            window.location = `/model/edit/${this.props.selectedModel}`;
        } else {
            window.location = `/model/add/${this.props.selectedYear}`;
        }
        /*
        const type = (this.props.selectedModel !== 0) ? 'Edit' : 'Add';
        console.log(`${type} Model ${this.props.selectedModel}`);
        window.location = '/specification';
        */
    };
    render() {
        let modelLabel = (this.props.selectedModel !== 0) ? 'Edit Model' : 'Add Model';
        let trimLabel = (this.props.selectedTrim !== 0) ? 'Edit Model' : 'Add Trim';
        let trimDisabled = (this.props.selectedModel === 0);

        return <div>
            <RaisedButton
                ref="modelButton"
                label={modelLabel}
                style={styles.button}
                primary={true}
                onClick={this.handleModelClick}
                icon={<MapDirectionsCar />}
            >
            </RaisedButton>
            <RaisedButton
                label={trimLabel}
                ref="trimButton"
                primary={true}
                icon={<ContentCut />}
                style={styles.button}
                onClick={this.handleTrimClick}
                disabled={trimDisabled}
            />
        </div>;
    }
}
const mapStateToProps = state => ({
    actionText: state.vehicles.actionText,
    selectedModel: state.vehicles.selectedModel,
    selectedTrim: state.vehicles.selectedTrim,
    selectedYear: state.vehicles.selectedYear
});

const mapDispatchToProps = dispatch => bindActionCreators({
    doAction,
    selectModel,
    selectTrim,
    selectYear
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleActions);

