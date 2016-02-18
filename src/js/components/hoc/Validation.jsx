import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update } from 'react-addons-update';

import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';


const mapStateToProps = state => ({errors: state.apiErrors});

/**
 * Higher order component to wrap the react-validation-mixin HOC to use with material-ui.
 * @param ComposedComponent {ReactComponent} Child component with a <FormContainer/> to validate.
 * @param validatorTypes {Object} Schema of Joi validations corresponding to Child component's form element refs.
 */
export default function Validation(ComposedComponent, validatorTypes) {
  /** Class that abstracts Joi validation to child component.
   * @extends Component
   * */

  class Validation extends Component {

    constructor() {
      super();
      this.validatorTypes = validatorTypes;
    }

    componentWillReceiveProps(nextProps) {
      const refPage = this.refs.component.isPage;
      const pageErrors = nextProps.errors[refPage] ? nextProps.errors[refPage] : {};
      const currentState = this.refs.component.state;
      const newErrors = {...currentState.errors, ...pageErrors};
      console.log(refPage, pageErrors);
      this.refs.component.setState({errors: newErrors});
    }


    /**
     * Gets all children in the child's <FormContainer> Element.
     * @returns {array}
     */
    getFormChildren = () => {
      if (this.refs.component.refs.formContainer
        && this.refs.component.refs.formContainer.props.children
        && this.refs.component.refs.formContainer.props.children.length) {
        return this.refs.component.refs.formContainer.props.children;
      }
      console.error('Either Component Validation does not container a <FormContainer> element or the <FormContainer> element has no viable Child Elements');
      return [];
    };


    /**
     * Gets the values from the children in the child's <FormContainer> Element.
     * @returns {object}
     */
    getValidatorData = () => {
      let validatorData = {};
      React.Children.map(this.getFormChildren(), (c) => {
        const key = c.ref;
        validatorData[key] = this.refs.component.refs[key] ? this.refs.component.refs[key].getValue() : '';
      });
      return validatorData;
    };

    /**
     * Validates the form.
     * @param ref {string=} Validates only the field whose `ref` corresponds to this value.
     * @returns valid {Boolean}
     */
    validateForm = (ref) => {
      //Clear all validations if no ref

      if (!ref) this.clearValidations();

      this.props.validate((err) => {
        let errorState = this.refs.component.state.errors;
        for (let k in err) {
          if ((ref && ref === k) || !ref) {
            const errors = err[k];
            errorState[k] = '';
            if (errors.length) {
              errorState[k] = this.cleanValidationMessage(errors[0]);
            }
          }
        }
        this.refs.component.setState({errors: errorState});
      });

      return this.props.isValid();
    };


    /**
     * Clears validations on the form.
     * @param ref {string=} Clears only the field whose `ref` corresponds to this value.
     */
    clearValidations = (ref) => {
      let state = {...this.refs.component.state};
      if (!ref) React.Children.map(this.getFormChildren(), (c) => state.errors[c.ref] = '');
      state.errors[ref] = '';
      this.refs.component.setState(state);
    };


    /**
     * Cleans the quotes (") out of the error messages (for style)
     * @param msg{string}
     * @returns{string}
     */
    cleanValidationMessage(msg) {
      return msg.replace(/"/g, '');
    }


    render() {
      return <ComposedComponent
        ref="component"
        {...this.props}
        getValidatorData={this.getValidatorData}
        validateForm={this.validateForm}
        clearValidations={this.clearValidations}
      />;
    }
  }
  return connect(mapStateToProps)(validation(strategy)(Validation));
}


