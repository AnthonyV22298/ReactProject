import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector(state => state.loginReducer.userInfo);


    return (
        <div>
        <table className="table">
            <thead>
                <tr>
                    <th>SSN</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Contact ID</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td> {user.dmv_socialsecuritynumber} </td>
                <td> {user.firstname} </td>
                <td> {user.lastname} </td>
                <td> {user.dob} </td>
                <td> {user.contactid} </td>
                <td> {user.city} </td>
            </tr>
            </tbody>
        </table>
        </div>
    );
}

export default Profile;
