import React, { Component } from 'react';
import Connection from './Connection';

class EmployeeFeedback extends Component {
    constructor(props) {
        super(props);
        this.empId = this.props.match.params.id;
        this.name = this.props.match.params.name;

        this.state = {
            id: null,
            content: '',
            isAssign: new Set(),
            oldFeedbackers: new Set()
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
            <h1>Employee: {this.name}</h1>
            <h3>List of Performance Reviews for Your Feedback:</h3>
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

export default EmployeeFeedback;