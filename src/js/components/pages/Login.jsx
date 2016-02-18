import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Joi from 'joi';


import Validation from '../hoc/Validation.jsx';
import BaseComponent from '../BaseComponent.jsx';

import Page from '../hoc/Page.jsx';
import FormContainer from '../global/FormContainer.jsx';
import GenericMessageArea from '../global/GenericMessageArea.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import {H1} from '../../theme/GenericTheme';

import {loginAsync} from '../../actions/authActions';
import {LOGIN_PAGE} from '../../constants/pageConsts';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


require('./Login.scss');


/** Class representing the Login Component
 * @extends BaseComponent
 * */
class Login extends BaseComponent {
  constructor() {
    super(...arguments);

    this.isPage = LOGIN_PAGE;

    this.state = {
      errors: {
        message: '',
        email: '',
        password: '',
      }
    };
  }


  componentWillUpdate() {
    //console.log('updating', this.state);
  }


  render() {
    const fieldStyle = {
      display: 'block',
      maxWidth: '90%'
    };
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

    return (
      <div className="row middle-xs center-xs" >
        <div className="col-xs-12 col-sm-4">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h1 style={H1}>Login</h1>
            <FormContainer ref="formContainer" style={padBottom}>
               <GenericMessageArea
                ref="message"
                text={this.state.errors.message}
               />
               <TextField
                 ref="email"
                 style={fieldStyle}
                 floatingLabelText="E-Mail"
                 onBlur={this.handleFieldBlur('email')}
                 onFocus={this.handleFieldFocus('email')}
                 onChange={this.handleFieldChange('email')}
                 errorText={this.state.errors.email}
                 onEnterKeyDown={this.handleFormSubmit}
               />
              <TextField
                ref="password"
                style={fieldStyle}
                type="password"
                floatingLabelText="Password"
                onBlur={this.handleFieldBlur('password')}
                onFocus={this.handleFieldFocus('password')}
                onChange={this.handleFieldChange('password')}
                errorText={this.state.errors.password}
                onEnterKeyDown={this.handleFormSubmit}
              />
            </FormContainer>
            <RaisedButton
              style={padBottom}
              primary={true}
              label="Login"
              onTouchTap={this.handleFormSubmit}
            />
            <Link
              className="text-link"
              to="/register"
            >Register
            </Link>
          </Paper>
        </div>
      </div>
    );
  }
  /*
   * Handlers
   * */

  handleFieldBlur = (ref) => {
    return (e) => {
      this.props.validateForm(ref);
    };
  };

  handleFieldChange = (ref) => {
    return (e) => {

    };
  };

  handleFieldFocus = (ref) => {
    return (e) => {
      this.props.clearValidations(ref);
    };
  };

  handleFormSubmit = () => {
    this.submitForm();
  };

  /*
  * Methods
  * */


  submitForm() {
    if (this.props.validateForm()) {
      const {email, password} = this.props.getValidatorData();
      this.props.loginAsync(email, password);
    }
  }


}


const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({
  loginAsync
}, dispatch);

const ValidatorTypes = {
  email: Joi.string().email().required().label('E-Mail'),
  password: Joi.string().required().label('Password')
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  validateForm: PropTypes.func,
  clearValidations: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(
  Page(
   Validation(Login, ValidatorTypes)
  )
);






