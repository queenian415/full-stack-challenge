/* Admin main page. List all the employees admin has access to.
   For simplicity and the scope of this challenge, the admin
   account defaults to adminId = 1.
   There's only one admin in this scope.
*/

import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Connection from './Connection';
import OneEmployee from './OneEmployee';

const ADMIN_ID = 1; // Default admin id.

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            employees: []
        }
        this.getAllEmployees = this.getAllEmployees.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    }

    getAllEmployees(adminId) {
        return Connection.getAllEmployees(adminId);
    }

    addEmployee(name) {
        let body = {
            adminId: ADMIN_ID,
            name: name
        }
        Connection.addEmployee(body).then((res) => {
            body.id = res.insertId;
            let newEmployees = this.state.employees.slice();
            newEmployees.push(body);
            this.setState({
                employees: newEmployees
            })
        })
    }

    componentDidMount() {
        this.getAllEmployees(ADMIN_ID).then((allEmployees) => {
            this.setState({
                employees: allEmployees
            });
        });
    }

    render() {
        return (
            <div className='left'>
                <h1>Admin ID {ADMIN_ID}</h1>
                <Switch>
                    <Route exact path='/adminEmp' render={(props) => (
                        <EmployeeAdminLink {...props} 
                            employees={this.state.employees}
                            addNew={this.addEmployee} />
                    )} />
                    <Route path='/adminEmp/:id/:name' component={(props) => (
                        <OneEmployee {...props} employees={this.state.employees} />
                    )} />
                </Switch>
            </div>               
        );
    }
}

class EmployeeAdminLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newName: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            newName: e.target.value
        })
    }

    handleSubmit() {
        if (this.state.newName !== '')
            this.props.addNew(this.state.newName);
    }

    render() {
        return (
            <div>
                <h2>All employees:</h2>
                <nav>{this.props.employees.map((a) => 
                        (<li key={a.id}><Link to={'/adminEmp/' + a.id + '/' + a.name}>
                            Id: {a.id}, {a.name}</Link>
                        </li>))}
                </nav><br/>
                <h3>Add new employee:</h3>
                <label>
                    <h5>Employee Name:</h5>
                    <input className='bottom' size='40%' type='text' value={this.state.newName} onChange={this.handleInputChange} />
                </label><br/>
                <button className='bottom' type="button" onClick={this.handleSubmit}>Add</button><br/>
                <Link to={'/'}>Back</Link>
            </div>
        )
    }
}

export default Admin;