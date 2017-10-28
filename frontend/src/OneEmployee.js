import React, { Component } from 'react';
import Connection from './Connection';
import { Link } from 'react-router-dom';

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
        this.addFeedbacker = this.addFeedbacker.bind(this);
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
                            isAssign: newFeedbackers
                        })
                    })
                })
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
        const empId = parseInt(e.target.id);
        let newAssign = null;
        if (e.target.checked == true) {
            if (!this.state.isAssign.has(empId)) {
                newAssign = this.state.isAssign;
                newAssign.add(empId);
                this.setState({
                    isAssign: newAssign
                });
            }
        } else { // checked == false
            if (this.state.isAssign.has(empId)) {
                newAssign = this.state.isAssign;
                newAssign.delete(empId);
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
                }, this.addFeedbacker(this.state.id, this.state.isAssign));
            } else {
                this.addFeedbacker(this.state.id, this.state.isAssign);
            }
        });
    }

    addFeedbacker(id, isAssign) {
        if (this.state.isAssign.size > 0) {
            this.state.isAssign.forEach((a) => {
                Connection.addFeedbacker(this.state.id, a);
            })
        }
    }

    render() {
        console.log(this.state.isAssign);
        return (
            <div>
            <h1>Employee: {this.name}</h1>
            <fieldset id={this.props.id}>
                <label>
                    <h2>Performance Review:</h2><br/>
                    <textarea rows="10" cols="50" name="content" value={this.state.content} onChange={this.handleInputChange}/>
                </label><br/>
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
                <button type="button" onClick={this.handleSubmit}>Save</button>
                <button type="button" onClick={this.props.history.goBack}>Back</button>
            </fieldset>
            </div>
        );
    }
}

export default OneEmployee;
