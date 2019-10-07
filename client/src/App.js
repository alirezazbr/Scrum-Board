import React from 'react';
import ScrumBoard from './components/scrumBoard/ScrumBoard';
// Login & Register pages
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/verify/Navbar';
import Landing from './components/verify/Landing';
import Login from './components/verify/Login';
import Register from './components/verify/Register';
import Profile from './components/verify/Profile';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <div className='container'>
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/profile' component={Profile} />
                    </div>
                </div>
            </Router>
        )
    }
}