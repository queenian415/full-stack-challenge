import React, { Component } from 'react';
import Connection from './Connection';

class OneEmployee extends Component {
    constructor(props) {
        super(props);
        this.empId = this.props.match.params.id;
        this.name = this.props.match.params.name;

        this.state = {
            id: null,
            content: '',
            isAssign: new Set()
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentDidMount() {
        Connection.getEmployeePerf(this.empId).then((perf) => {
            if (perf.length > 0) {
                console.log('load performance');
                this.setState({
                    id: perf[0].id,
                    content: perf[0].content,
                })
                Connection.getFeedbackers(perf[0].id).then((res) => {
                    const newFeedbackers = new Set();                    
                    res.map((a) => {
                        newFeedbackers.add(a.feedbackerId);
                        this.setState({
                            isAssign: newFeedbackers,
                        })
                    })
                })
            } else {
                Connection.addEmployeePerf(this.state.id, this.empId, this.state.content).then((res) => {
                    if (this.state.id == null) {
                        this.setState({
                            id: res.insertId
                        });
                    }
                });
            }
        });     
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleCheckboxChange(e) {
        console.log("handle check box");
        const feedbackerId = parseInt(e.target.id);
        let newAssign = null;
        if (e.target.checked == true) {
            if (!this.state.isAssign.has(feedbackerId)) {
                Connection.addFeedbacker(this.state.id, feedbackerId, this.empId);
                newAssign = new Set(this.state.isAssign);
                newAssign.add(feedbackerId);
                this.setState({
                    isAssign: newAssign
                });
            }
        } else { // checked == false
            if (this.state.isAssign.has(feedbackerId)) {
                Connection.removeFeedbacker(this.state.id, feedbackerId);
                newAssign = new Set(this.state.isAssign);
                newAssign.delete(feedbackerId);
                this.setState({
                    isAssign: newAssign
                });
            }
        }
    }

    handleSubmit(e) {
        Connection.addEmployeePerf(this.state.id, this.empId, this.state.content).then((res) => {
            if (this.state.id == null) {
                this.setState({
                    id: res.insertId,
                });
            }
        });
    }

    render() {
        return (
            <div>
            <h1>Employee: {this.name}</h1>
            <fieldset id={this.props.id}>
                <label>
                    <h2>Performance Review:</h2><br/>
                    <textarea rows="10" cols="50" name="content" value={this.state.content} onChange={this.handleInputChange}/>
                </label><br/>
                <button type="button" onClick={this.handleSubmit}>Save</button><br/>
                <label>
                    <h3>Assign employees for feedbacks:</h3><br/>
                    {this.props.employees.map((emp) => {
                        if (emp.id != this.empId) {
                            return (
                            <label key={emp.id}>
                                <input id={emp.id} name="isAssign" type="checkbox"
                                    checked={this.state.isAssign.has(emp.id)}
                                    onChange={this.handleCheckboxChange} /> 
                                {emp.name}<br/>
                            </label>);
                        }
                        else return null;
                        })}
                </label><br/>
                <button type="button" onClick={this.props.history.goBack}>Back</button>
            </fieldset>
            </div>
        );
    }
}

export default OneEmployee;
