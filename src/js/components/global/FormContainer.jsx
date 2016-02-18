import React, {Component} from 'react';


export default class extends Component {
  render() {
    return <span style={this.props.style}>{this.props.children}</span>;
  }
}


