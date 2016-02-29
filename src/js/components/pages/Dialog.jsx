import React, {PropTypes} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class ModelPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleOpen = () => {
        console.log('open');
        this.setState({open: true});
        console.log(this.state.open);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this._handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onTouchTap={this._handleClose}
            />,
        ];
        return (
            <div>
                <FlatButton
                    label="Open"
                    primary={true}
                    disabled={false}
                    onTouchTap={this._handleOpen}
                />
                <Dialog
                    title="Dialog With Actions"
                    modal={true}
                    open={this.state.open}
                    actions={actions}
                    onRequestClose={this._handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}
