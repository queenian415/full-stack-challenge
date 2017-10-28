import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Connection from './Connection';
import EmployeeFeedback from './EmployeeFeedback';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
        this.getAllEmployees = this.getAllEmployees.bind(this);
    }

    getAllEmployees(adminId) {
        return Connection.getAllEmployees(adminId);
    }

    componentDidMount() {
        this.getAllEmployees(1).then((allEmployees) => {
            this.setState({
                employees: allEmployees
            });
        });
    }

    render() {
        return (
            <div className='left'>
                <h1>Employee: (please select who you are from below)</h1>
                <Switch>
                    <Route exact path='/employee' render={(props) => (
                        <EmployeeLink {...props} employees={this.state.employees} />
                    )} />
                    <Route exact path='/employee/:id/:name' render={(props) => (
                        <EmployeeFeedback {...props} employees={this.state.employees} />
                    )} />
                </Switch>
            </div>               
        );
    }
}

class EmployeeLink extends Component {
    render() {
        return (
            <div>
                <h2>I am... :</h2>
                <nav>{this.props.employees.map((a) => 
                        (<li key={a.id}><Link to={'/employee/' + a.id + '/' + a.name}>
                            {a.id}, {a.adminId}, {a.name}</Link>
                        </li>))}
                </nav><br/>
                <Link to={'/'}>Back</Link>
            </div>
        )
    }
}

export default Employee;