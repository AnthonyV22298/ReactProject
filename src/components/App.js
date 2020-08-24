"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';
//import Logout from './Logout.js';
import Header from './Header.js';
import Home from './Home.js';
import BookContainer from './BookContainer';
import ContactContainer from './ContactContainer';
import InformationContainer from './InformationContainer';

export class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/vehicles' component={BookContainer}/>
                    <Route path='/contacts' component={ContactContainer}/>
                    <Route path='/information' component={InformationContainer}/>
                </Switch>
            </div>
        );
    }
}