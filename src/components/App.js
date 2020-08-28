"use strict"
import React from 'react';
import {Switch, Route} from 'react-router-dom';
//import Logout from './Logout.js';
import Header from './Header.js';
import Home from './Home.js';
import BookContainer from './BookContainer';
import AppointmentMakeContainer from './AppointmentMakeContainer';
import AppointmentContainer from './AppointmentContainer';
import FeeContainer from './FeeContainer';
import InformationContainer from './InformationContainer'
import LoginPage from './Login.js';
import ProfilePage from './Profile.js';
import PaypalContainer from './PaypalContainer.js'


export class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/profile'component={ProfilePage}/>
                    <Route path='/vehicles' component={BookContainer}/>
                    <Route path='/appointments' component={AppointmentContainer}/>
                    <Route path='/CreateAppointment' component={AppointmentMakeContainer}/>
                    <Route path='/fees' component={FeeContainer}/>
                    <Route path='/information' component={InformationContainer}/>
                    <Route path='/pay' component={PaypalContainer}/>
                </Switch>
            </div>
        );
    }
}