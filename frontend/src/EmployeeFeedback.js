import React, { Component } from 'react';
import Connection from './Connection';

class EmployeeFeedback extends Component {
    constructor(props) {
        super(props);
        this.empId = this.props.match.params.id;
        this.name = this.props.match.params.name;

        this.state = {
            perfs: new Map()
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePerfs = this.updatePerfs.bind(this);
    }

    componentDidMount() {
        Connection.getPerfsForFeedback(this.empId).then((res) => {
            const map = new Map();
            res.map((row) => {
                map.set(row.perfId, row);
                this.setState({
                    perfs: map
                })
            })
        })
    }

    handleSubmit(e) {
        const perf = this.state.perfs.get(parseInt(e.target.id));
        perf.feedbackerId = this.empId;
        
        Connection.addFeedback(perf).then((res) => {
            console.log(res);
            if (perf.feedbackId == null) {
                perf.feedbackId = res.insertId;
                this.updatePerfs(perf);
            }
        });
    }

    updatePerfs(perf) {
        let perfs = new Map(this.state.perfs);
        perfs.set(perf.perfId, perf);
        this.setState({
            perfs: perfs
        });
    }

    handleInputChange(e) {
        let perf = this.state.perfs.get(parseInt(e.target.id));
        perf.feedbackContent = e.target.value;
        
        this.updatePerfs(perf);
    }


    render() {
        console.log(this.state.perfs);
        const rows = [];
        this.state.perfs.forEach((perf) => (rows.push(
            <fieldset className='bottom' key={perf.perfId}>
                <h4>Performance Review for {perf.name}:</h4>
                <textarea readOnly rows="10" cols="50" name="content" value={perf.perfContent} />
                <br/>
                <h4> Your Feedback:</h4>
                <textarea id={perf.perfId} rows="5" cols="50" name="content" 
                    value={perf.feedbackContent} 
                    onChange={this.handleInputChange}/><br/>
                <button id={perf.perfId} type="button" onClick={this.handleSubmit}>Submit</button><br/>
            </fieldset>
        )));
        return (
            <div>
                <h1>Employee: {this.name}</h1>
                <h3>List of Performance Reviews for Your Feedback:</h3>
                {rows}
                <button type="button" onClick={this.props.history.goBack}>Back</button>                            
            </div>
        );
    }
}

export default EmployeeFeedback;