"use strict"

import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const userInfo = useSelector(state => state.loginReducer);

        return(
            <div className="jumbotron">
                <h1>DMV Custom App</h1>
                {userInfo.loggedIn === true
                    ? <label>Welcome, {userInfo.userInfo.firstname}!</label>
                    : <label>Please Login to access the app.</label>
                }
            </div>
        );
}

export default Home;
