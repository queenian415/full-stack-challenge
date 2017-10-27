import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Admin from './Admin';
import Employee from './Employee';
import './App.css';

const Links = () => {
    return (
        <div className='center'>
            <nav>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/employee'>Employee</Link></li>
            </nav>
        </div>
    );
}

class Home extends Component {
    render() {
        return (
            <body>
                <Switch>
                    <Route exact path='/' component={Links} />
                    <Route exact path='/admin' component={Admin} />
                    <Route exact path='/employee' component={Employee} />
                </Switch>
            </body>
        );
    }
}

export default Home;