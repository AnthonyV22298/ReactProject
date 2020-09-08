"use strict"
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAttempt } from '../actions/userActions';
import { Navbar, Nav, NavDropdown, NavLink} from 'react-bootstrap'

const Header = () => {
    const userInfo = useSelector(state => state.loginReducer.loggedIn);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAttempt());
    }
    console.log("user info:" + userInfo);
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">DMV</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                {userInfo === true
                    ?
                    <Nav className="mr-auto">
                    
                        <NavLink href="#/">Home</NavLink>
                        <NavLink href="#/information">My Info</NavLink>
                        <NavLink href="#/vehicles">My Vehicles</NavLink>
                        <NavLink href="#/profile">Profile Page</NavLink>
                        
                        <NavDropdown title="Fees" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#/fees">View Fees</NavDropdown.Item>
                            <NavDropdown.Item href="#/pay">Pay Fees</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Appointments" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#/appointments">View Appointments</NavDropdown.Item>
                            <NavDropdown.Item href="#/CreateAppointment">Create Appointments</NavDropdown.Item>
                        </NavDropdown>
                        
                        <NavLink href="#/" onClick={() => handleLogout()}>Logout</NavLink>
                        
                    </Nav>
                    :
                    <NavLink href="#/login">Login</NavLink>}
                
                    
                
            </Navbar.Collapse>
            </Navbar>
        );
}

export default Header;
