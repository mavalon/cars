import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';

import Joi from 'joi';
import BaseComponent from '../BaseComponent.jsx';
import Validation from '../hoc/Validation.jsx';
import Page from '../hoc/Page.jsx';
import FormContainer from '../global/FormContainer.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';


import {H1} from '../../theme/GenericTheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
*
* Todo
* Make registration page
*
* */
class Register extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    };
  }

  renderContent() {

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
            <h1 style={H1}>Registration</h1>
            <FormContainer ref="formContainer" style={padBottom}>
              <TextField
                ref="name"
                style={fieldStyle}
                floatingLabelText="Name"
                onBlur={this.handleFieldBlur('name')}
                onFocus={this.handleFieldFocus('name')}
                onChange={this.handleFieldChange('name')}
                errorText={this.state.name}
                onEnterKeyDown={this.handleEnterKey}
              />
              <TextField
                ref="email"
                style={fieldStyle}
                floatingLabelText="E-Mail"
                onBlur={this.handleFieldBlur('email')}
                onFocus={this.handleFieldFocus('email')}
                onChange={this.handleFieldChange('email')}
                errorText={this.state.email}
                onEnterKeyDown={this.handleEnterKey}
              />
              <TextField
                ref="password"
                style={fieldStyle}
                type="password"
                floatingLabelText="Password"
                onBlur={this.handleFieldBlur('password')}
                onFocus={this.handleFieldFocus('password')}
                onChange={this.handleFieldChange('password')}
                errorText={this.state.password}
                onEnterKeyDown={this.handleEnterKey}
              />
              <TextField
                ref="passwordConfirm"
                style={fieldStyle}
                type="password"
                floatingLabelText="Password Confirm"
                onBlur={this.handleFieldBlur('passwordConfirm')}
                onFocus={this.handleFieldFocus('passwordConfirm')}
                onChange={this.handleFieldChange('passwordConfirm')}
                errorText={this.state.passwordConfirm}
                onEnterKeyDown={this.handleEnterKey}
              />
            </FormContainer>
            <RaisedButton
              style={padBottom}
              primary={true}
              label="Register"
              onTouchtap={this.submitForm}
            />

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

  handleEnterKey = () => {
    this.submitForm();
  };

  submitForm() {
    if (this.props.validateForm()) {
      /*
       * TODO
       * submit form
       * */
    }
  }
}


const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);

const ValidatorTypes = {
  name: Joi.string().min(3).required().label('Name'),
  email: Joi.string().email().required().label('E-Mail'),
  password: Joi.string().required().label('Password'),
  passwordConfirm: Joi.any().valid(Joi.ref('password')).required().label('Confirm Password').options({language: {any: {allowOnly: 'doesn\'t match.'}}})
};

Register.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  validateForm: PropTypes.func,
  clearValidations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Page(Validation(Register, ValidatorTypes))
);






