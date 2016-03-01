import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Section from '../elements/Section.jsx';

export default class ModelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: props.data.sections
        };
    }

    render() {
        let data = this.props.data;
        let sections = data.sections;

        let rows = [];
        if (sections) {
            for (let s = 0; s < sections.length; s++) {
                rows.push(<Section ref="section" onValueClick={this.props.onValueClick} key={s} section={sections[s]} />);
            }
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}
