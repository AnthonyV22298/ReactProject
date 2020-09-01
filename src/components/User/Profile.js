import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactAttempt } from '../../actions/profileActions';
import SuccessBanner from '../Helper/SuccessBanner';
import DMV_stateDropdown from './DMV_stateDropdown';

const ProfilePage = () => {

    let user = useSelector(state => state.loginReducer.userInfo);
    let loginReducer = useSelector(state => state.loginReducer);
    //sets the variables initial value to the users current user info state
    const [inputs, setInputs] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        emailaddress1: user.emailaddress1,
        address1_line1: user.address1_line1,
        address1_city: user.address1_city,
        address1_postalcode: user.address1_postalcode,
        mobilephone: user.mobilephone,
        dmv_state: user.dmv_state,
    });

    const { firstname, lastname, emailaddress1, address1_line1, address1_city, address1_postalcode, mobilephone, dmv_state } = inputs;


    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateContactAttempt(inputs, user));
    };

    const handleDropdown = (e) => {
    console.log("handle dropdown");
    //console.log(e); // html
    //const {dmv_state, value} = e;
    setInputs(inputs => ({ ...inputs, ["dmv_state"]: e.target.value}));
    console.log("this is e target: " + e.target);
    //console.log("value = " + e.target.value + " : label = " + e.target.label);
}

//sets a table for the users current Information
//handles change and submits user input
    return (

        <div className="col-lg-8 offset-lg-2">
        <h1>Current Contanct Details</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zip</th>
                    <th>Phone Number</th>
                    <th>Date of Birth</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td> {user.firstname} </td>
                <td> {user.lastname} </td>
                <td> {user.emailaddress1} </td>
                <td> {user.address1_line1} </td>
                <td> {user.address1_city} </td>
                <td> {user.address1_postalcode} </td>
                <td> {user.mobilephone} </td>
                <td> {user.dmv_dateofbirth} </td>
                <td> {user.dmv_state} </td>
            </tr>
            </tbody>
        </table>
            <form name="form" onSubmit={handleSubmit}>
            {
                loginReducer.updateSuccess &&
                <SuccessBanner>
                    Contact Information Updaed Successfully!
                </SuccessBanner>
            }
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstname" value={firstname} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" value={lastname} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="emailaddress1" value={emailaddress1} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address1_line1" value={address1_line1} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="address1_city" value={address1_city} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" name="address1_postalcode" value={address1_postalcode} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="mobilephone" value={mobilephone} onChange={handleChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>U.S. State</label>
                    <DMV_stateDropdown name="dmv_state" value={dmv_state} onChange={handleDropdown}/>
                </div>
                <button className="btn btn-primary">
                {loginReducer.updating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Update
                </button>
            </form>

        </div>
    );
}
export default ProfilePage;
