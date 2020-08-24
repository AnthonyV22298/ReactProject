"use strict"
import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAttempt } from '../actions/userActions';

const Header = () => {
    const userInfo = useSelector(state => state.loginReducer.loggedIn);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAttempt());
    }
    console.log("user info:" + userInfo);
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <Link to="/" className="navbar-brand">
                                <img width="90px" height="30px" src="images/logo.png" />
                            </Link>
                        </li>
                        {userInfo === true
                            ?
                            <ul className="list-inline">
                            <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                            <li className="list-inline-item"><Link to="/vehicles" replace>Vehicles</Link></li>
                            <li className="list-inline-item"><Link to="/appointments" replace>Appointments</Link></li>
                            <li className="list-inline-item"><Link to="/fees" replace>Fees</Link></li>
                            <li className="list-inline-item"><Link to="/information" replace>My Info</Link></li>
                            <li onClick={() => handleLogout()}><Link to="/" replace>Logout</Link></li>
                            <li className="list-inline-item"><Link to="/profile" replace>Profile</Link></li>
                            </ul>
                            :
                            <li className="list-inline-item"><Link to="/login" replace>Login</Link></li>
                        }
                    </ul>
                </div>
            </nav>
        );
}

export default Header;