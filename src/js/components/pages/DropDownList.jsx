let MyParentChange = React.createClass({

    getInitialState: () => {
        return {
            data: [], value: {}, showOutput: false
        };
    },

    componentDidMount: () => {
        $.get(this.props.source, (result) => {
            this.setState({
                data: result
            });
        });
    },

    render: () => {
        return (
            <div onChange={this.changeHandler}>
                <MySelectChange data={this.state.data}/>
                { this.state.showOutput ? <MyOutputChange item={this.state.value}/> : null }
            </div>
        );
    },

    changeHandler: (childComponent) => {
        this.state.data.forEach(function(item) {
            if (parseInt(item.id, 10) === parseInt(childComponent.target.value, 10)) {
                this.setState({showOutput: item.id > 0});
                this.setState({value: item});
            }
        }.bind(this));
    }

});


let MyOutputChange = React.createClass({

    render: function() {
        return (<div>
            <h3>Output</h3>
            <p>Id: <b>{this.props.item.id}</b> Value: <b>{this.props.item.value}</b></p>
        </div>);
    }

});


let MySelectChange = React.createClass({

    render: () => {
        let mySelectOptions = (result) => {
            return <MySelectOptionsChange
                key={result.id}
                data={result}/>;
        };
        return (
            <select
                className="form-control">
                {this.props.data.map(mySelectOptions)}
            </select>
        );
    }
});

let MySelectOptionsChange = React.createClass({
    render: () => {
        return <option value={this.props.data.id}>{this.props.data.value}</option>;
    }
});


React.render(
    <MyParentChange source="/api/years"/>,
    document.getElementById('dropdownchange')
);
