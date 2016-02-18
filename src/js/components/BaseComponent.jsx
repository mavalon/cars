import React, { Component } from 'react';
import isUndefined from 'lodash/isUndefined';


import GenericTheme from '../theme/GenericTheme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';


class BaseComponent extends Component {

  constructor(opts) {
    super(opts);
  }


  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(GenericTheme),
    };
  }

  go = (pathName, replaceHistory) => {
    const { replace, push } = this.context.history;

    if (replaceHistory) {
      replace(pathName);
    } else {
      push(pathName);
    }
  };

}

BaseComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};

BaseComponent.contextTypes = {
  history: React.PropTypes.object
};



export default BaseComponent;
