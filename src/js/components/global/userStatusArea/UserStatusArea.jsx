import React, {Component, PropTypes} from 'react';

import BaseComponent from '../../BaseComponent.jsx';
import Page from '../../hoc/Page.jsx';

import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import ActionMail from 'material-ui/lib/svg-icons/content/mail';
import ActionNotification from 'material-ui/lib/svg-icons/social/notifications';

import {PMS_3005_C, PMS_430_C, WHITE, ROBOTO} from '../../../theme/GenericTheme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

require('./UserStatusArea.scss');


class UserStatusArea extends BaseComponent {
  constructor() {
    super(...arguments);
  }


  render() {
    return this.props.user.loggedIn && (
      <div className="user-status-area">
        <div className="user-status-area-column user-status-area-id">
          <div>
            <div className="user-status-area-id-name">{this.props.user.name}</div>
            <div className="user-status-area-id-role">{this.props.user.title}</div>
          </div>

        </div>
        <div className="user-status-area-column user-status-area-icon">
          <Avatar
            color={PMS_3005_C}
            backgroundColor={PMS_430_C}
            style={ROBOTO}
          >
            {this.props.user.name.substr(0, 1).toUpperCase()}
          </Avatar>
        </div>
        <div className="user-status-area-column user-status-area-divider"></div>
        <div className="user-status-area-column user-status-area-messages">
          <IconMenu
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}

            iconButtonElement={
            <IconButton>
              <ActionMail color={WHITE} />
            </IconButton>
            }>
            <div className="menu-title">Messages</div>
            <Divider/>
            {this.props.messages.inbox.map((msg,i) => {
              return <ListItem
                key={`inbox_msg_${i}`}
                primaryText={msg.from.name}
                secondaryText={`${msg.body.substr(0, 20)}...`}
                leftAvatar={<Avatar
                  color={PMS_3005_C}
                  backgroundColor={PMS_430_C}
                  style={ROBOTO}
                >{msg.from.name.substr(0, 1).toUpperCase()}</Avatar>}

              />;
            })}
          </IconMenu>
        </div>
        <div className="user-status-area-column user-status-area-notification">
          <IconButton
            onTouchTap={this.props.handleNotifications}
          >
            <ActionNotification color={WHITE} />
          </IconButton>
        </div>
      </div>
    );
  }
}

UserStatusArea.propTypes = {
  user: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  handleMessages: PropTypes.func.isRequired,
  handleNotifications: PropTypes.func.isRequired,
};


export default UserStatusArea;
