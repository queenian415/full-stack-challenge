/* Admin main page. List all the employees admin has access to.
   For simplicity and the scope of this challenge, the admin
   account defaults to adminId = 1.
   There's only one admin in this scope.
*/

import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Connection from './Connection';

const ADMIN_ID = 1; // Default admin id.

class AllEmployees extends Component {
    constructor(props) {
        super(props);
        this.getAllEmployees = this.getAllEmployees.bind(this);
    }

    getAllEmployees(adminId) {
        Connection.getAllEmployees(adminId);
    }

    render() {
        this.getAllEmployees(ADMIN_ID);
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
                    <Route path='/employee-performance/:id' component={OneEmployee} />
                </Switch>
            </div>               
        );
    }
}

export default Admin;