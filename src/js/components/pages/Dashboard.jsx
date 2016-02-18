import React, {Component} from 'react';
import BaseComponent from '../BaseComponent.jsx';

import Page from '../hoc/Page.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


/*
*
* Todo
* UX Flow v1.0 - https://drive.google.com/file/d/0B_4ge8XNolQNU2t6UVkwcHFBdjA/view?usp=sharing
* Page 6
*
* */
class Dashboard extends BaseComponent {
  constructor() {
    super(...arguments);
  }

  renderContent() {

  }

  render() {
    return (
      <div>
      </div>
    );
  }
}


const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page(Dashboard));






