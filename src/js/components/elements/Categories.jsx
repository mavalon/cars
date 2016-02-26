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
                rows.push(<Section key={s} section={sections[s]} />);
            }
        }

        return (
            <div>
                {this.props.filename}
                {rows}
            </div>
        );
    }
}
