import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ContentCut from 'material-ui/lib/svg-icons/content/content-cut';
import MapDirectionsCar from 'material-ui/lib/svg-icons/maps/directions-car';

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

const VehicleActions = () => (
    <div>
        <RaisedButton
            label="Add Model"
            style={styles.button}
            primary={true}
            icon={<MapDirectionsCar />}
        >
        </RaisedButton>
        <RaisedButton
            label="Add Trim"
            primary={true}
            icon={<ContentCut />}
            style={styles.button}
        />
    </div>
);

export default VehicleActions;
