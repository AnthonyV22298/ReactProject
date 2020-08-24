"use strict"

import React from 'react';
import {Link} from 'react-router-dom';
import { authContext } from '../adalConfig';

const Header = () => {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="list-inline">
                        <li className="list-inline-item"> 
                            <Link to="/" className="navbar-brand">
                                <img width="90px" height="30px" src="images/logo.png" />
                            </Link>
                        </li>
                        <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                        <li className="list-inline-item"><Link to="/vehicles" replace>Vehicles</Link></li>
                        <li className="list-inline-item"><Link to="/appointments" replace>Appointments</Link></li>
                        <li className="list-inline-item"><Link to="/fees" replace>Fees</Link></li>
                        <li className="list-inline-item"><Link to="/contacts" replace>Contacts</Link></li>
                        <li className="list-inline-item"><Link to="/information" replace>My Info</Link></li>
                        <button onClick={() => authContext.logOut()}>Logout</button>
                    </ul>
                </div>
            </nav>
        );
}

export default Header;