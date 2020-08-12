"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './Header.js';
import Home from './Home.js';
import BookContainer from './BookContainer';

export class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/vehicles' component={BookContainer}/>
                </Switch>
            </div>
        );
    }
}