import React, {Component} from 'react';
import Paper from 'material-ui/lib/paper';




class GenericMessageArea extends Component {
  getValue() {
    return null;
  }
  render() {
    return (
      <div tabIndex={this.props.tabIndex} className={`generic-message-area ${this.props.text ? 'generic-message-area--Error' : ''} `}>
        {this.props.text}
      </div>
    );
  }
}


export default GenericMessageArea;
