import React from 'react';
import StaticContainer from 'react-static-container';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {Link} from 'react-router';
import BaseComponent from './components/BaseComponent.jsx';
import Footer from './components/global/Footer.jsx';
import UserStatusArea from './components/global/userStatusArea/UserStatusArea.jsx';


//MUI
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import Divider from 'material-ui/lib/divider';

require('flexboxgrid/dist/flexboxgrid.min.css');
require('./Main.scss');


class Main extends BaseComponent {


    constructor(props, context) {
        super(props, context);

        this.state = {
            menuOpen: false
        };
    }


    renderMenu() {
        return (
            <LeftNav
                ref="leftNav"
                docked={false}
                open={this.state.menuOpen}
                onRequestChange={this.handleClose}
                style={{ padding: '20px 0' }}
            >
                { !this.props.user.loggedIn ?
                <span>
            <Link to="/login"><MenuItem onTouchTap={this.handleClose}>Login</MenuItem></Link>
            <Divider />
            <Link to="/register"><MenuItem onTouchTap={this.handleClose}>Register</MenuItem></Link>
            <Divider />
            <Link to="/vehicles"><MenuItem onTouchTap={this.handleClose}>Vehicles</MenuItem></Link>
            <Divider />
            <Link to="/specifications"><MenuItem onTouchTap={this.handleClose}>Specifications</MenuItem></Link>
          </span>
                    :
                <span>
            <MenuItem onTouchTap={this.handleClose}>Logout</MenuItem>
            <Divider />
          </span>
                    }
            </LeftNav>
        );
    }

    renderUserStatusArea() {
        return <UserStatusArea
            user={this.props.user}
            messages={this.props.messages}
            handleMessages={this.handleMessages}
            handleNotifications={this.handleNotifications}

        />;
    }

    renderAppBar() {
        return (
            <AppBar
                ref="appBar"
                title="Hyundai Models"
                iconElementRight={this.renderUserStatusArea()}
                showMenuIconButton={true}
                onLeftIconButtonTouchTap={this.handleToggle}
            />
        );
    }


    render() {
        return (
            <div className="display-flex container-main">
                {this.renderMenu()}
                {this.renderAppBar()}
                <div className="container-fluid content-container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }

    handleMessages = () => {
        console.info('Main.handleMessages - Fired');
    };

    handleNotifications = () => {
        console.info('Main.handleNotifications - Fired');
    };

    handleToggle = () => this.setState({menuOpen: !this.state.menuOpen});
    handleClose = () => this.setState({menuOpen: false});

}

const mapStateToProps = state => ({user: state.user, messages: state.messages});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
