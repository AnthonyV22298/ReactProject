import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactAttempt } from '../actions/profileActions';
import SuccessBanner from './SuccessBanner';




const ProfilePage = () => {
    console.log(JSON.parse(localStorage.getItem('token')));
    //get the users state
    let user = useSelector(state => state.loginReducer.userInfo);
    let loginReducer = useSelector(state => state.loginReducer);
    console.log(JSON.stringify(user));
    //sets the variables initial value to the users current user info state
    const [inputs, setInputs] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        emailaddress1: user.emailaddress1,
        address1_line1: user.address1_line1,
        address1_city: user.address1_city,
        address1_postalcode: user.address1_postalcode,
        mobilephone: user.mobilephone
    });
    const { firstname, lastname, emailaddress1, address1_line1, address1_city, address1_postalcode, mobilephone } = inputs;




    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateContactAttempt(inputs));
    };
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
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstname" value={firstname} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" value={lastname} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="emailaddress1" value={emailaddress1} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address1_line1" value={address1_line1} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="address1_city" value={address1_city} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" name="address1_postalcode" value={address1_postalcode} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="mobilephone" value={mobilephone} onChange={handleChange} />
                </div>
                <button className="btn btn-primary">
                {loginReducer.updating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Update
                </button>
                {
                    loginReducer.updateSuccess &&
                    <SuccessBanner>
                        Contact Information Updaed Successfully!
                    </SuccessBanner>
                }
            </form>

        </div>
    );
}
export default ProfilePage;
