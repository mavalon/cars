import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginAsync } from '../../actions/authActions';

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => bindActionCreators({
  loginAsync
}, dispatch);


export default function Page(ComposedComponent) {
  class Page extends Component {

    go = (pathName, replaceHistory) => {
      const { replace, push } = this.context.history;

      if (replaceHistory) {
        replace(pathName);
      } else {
        push(pathName);
      }
    };

    render() {
      return <ComposedComponent ref="component" {...this.props} go={this.go} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Page);
}

