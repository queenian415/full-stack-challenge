import React, { Component } from 'react';
import Connection from './Connection';

class EmployeeFeedback extends Component {
    constructor(props) {
        super(props);
        this.empId = this.props.match.params.id;
        this.name = this.props.match.params.name;

        this.state = {
            perfs: []
        }
    }

    componentDidMount() {
        Connection.getPerfsForFeedback(this.empId).then((res) => {
            const rows = [];
            res.map((row) => {
                rows.push(row);
                this.setState({
                    perfs: rows
                })
            })
        })
    }

    render() {
        console.log(this.state.perfs);
        return (
            <div>
            <h1>Employee: {this.name}</h1>
            <h3>List of Performance Reviews for Your Feedback:</h3>
            {this.state.perfs.map((perf) => (
                <fieldset className='bottom' key={perf.id}>
                    <h4>Performance Review for {perf.name}:</h4><br/>
                    <textarea readOnly rows="10" cols="50" name="content" value={perf.content} />
                    <br/>    
                </fieldset>)
            )}
            <button type="button" onClick={this.props.history.goBack}>Back</button>                            
            </div>
        );
    }
}

export default EmployeeFeedback;