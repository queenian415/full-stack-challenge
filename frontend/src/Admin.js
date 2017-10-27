import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Connection from './Connection';

class AllEmployees extends Component {
    constructor(props) {
        super(props);
        this.getAllEmployees = this.getAllEmployees.bind(this);
    }

    getAllEmployees() {
        Connection.getAllEmployees();
    }

    render() {
        this.getAllEmployees();
        return (
            <div>
                <h2>All employees:</h2>
            </div>
        );
    }
}

class OneEmployee extends Component {}

class Admin extends Component {
    render() {
        return (
            <div>
                <h1>Admin</h1>
                <Switch>
                    <Route exact path='/admin' component={AllEmployees} />
                    <Route path='/admin/:id' component={OneEmployee} />
                </Switch>
            </div>               
        );
    }
}

export default Admin;