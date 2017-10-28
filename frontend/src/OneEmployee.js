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
            isNew: true,
            isAssign: new Set()       
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    componentDidMount() {
        Connection.getEmployeePerf(this.empId).then((perf) => {
            if (perf.length > 0) {
                this.setState({
                    id: perf[0].id,
                    content: perf[0].content,
                    isNew: false
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

    isChecked(empId) {
        console.log("debug point:" + this.state.isAssign.__proto__);
        //return this.state.isAssign.has(empId);
    }

    handleSubmit(e) {
        Connection.addEmployeePerf(this.empId, this.state.content).then((res) => {
            this.setState({
                id: res.insertId,
                isNew: false
            });
        });
    }

    render() {
        console.log(this.state.isAssign);
        return (
            <div>
            <h1>Employee: {this.name}</h1>
            <fieldset>
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
                                    checked={this.isChecked(emp.id)}
                                    onChange={this.handleCheckboxChange} /> 
                                {emp.name}<br/>
                            </label>);
                        }
                        else return null;
                        })}
                </label><br/>
                <button type="button" onClick={this.handleSubmit}>Save</button>
            </fieldset>
            </div>
        );
    }
}

export default OneEmployee;
