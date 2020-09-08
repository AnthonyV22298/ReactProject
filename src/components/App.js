"use strict"
import React from 'react';
import {Switch, Route} from 'react-router-dom';
//import Logout from './Logout.js';
import Header from './Header.js';
import Home from './Home.js';
import AppointmentMakeContainer from './Appointment/AppointmentMakeContainer';
import AppointmentContainer from './Appointment/AppointmentContainer';
import FeeContainer from './Fee/FeeContainer';
import InformationContainer from './Information/InformationContainer'
import LoginPage from './User/Login.js';
import ProfilePage from './User/Profile.js';
import PaypalContainer from './Paypal/PaypalContainer.js'
import VehicleDetailsContainer from './Vehicle/VehicleDetailsContainer.js';


export class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/profile'component={ProfilePage}/>
                    <Route path='/vehicles' component={VehicleDetailsContainer}/>
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
