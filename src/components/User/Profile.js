import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactAttempt } from '../../actions/profileActions';
import SuccessBanner from '../Helper/SuccessBanner';
import DMV_stateDropdown from './DMV_stateDropdown';
import axios from 'axios';
import { adalApiFetch } from '../../adalConfig.js';
import Scroll from "./Scroll";

const ProfilePage = () => {
    let user = useSelector(state => state.loginReducer.userInfo);
    let loginReducer = useSelector(state => state.loginReducer);

    const [dmvstate, setFormat] = useState({});

    const { dmv_state_text } = dmvstate;
    console.log(dmv_state_text);

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
        dmv_reactappedited: true,
    });

    const { firstname, lastname, emailaddress1, address1_line1, address1_city, address1_postalcode, mobilephone, dmv_state, dmv_reactappedited } = inputs;
    console.log(dmv_reactappedited);
    //get request for formatted value
    function getFormatted(inputCompare) {
      let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'crefc_locations/json',
        'Content-Type': 'crefc_locations/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
      }
      //@OData.Community.Display.V1.FormattedValue
      adalApiFetch(axios,"https://sstack4.crm.dynamics.com/api/data/v8.2/GlobalOptionSetDefinitions(Name='dmv_states')/Microsoft.Dynamics.CRM.OptionSetMetadata",config)
          .then(results => {
              for (let i = 0; i < results.data.Options.length; i++) {

                let stateValue = results.data.Options[i].Value
                if(inputCompare == stateValue) {
                    setFormat(dmvstate => ({ ...dmvstate, dmv_state_text: results.data.Options[i].Label.LocalizedLabels[0].Label }));
                }
            }
          },
          function(error) {
              console.log(error.message);
          }
              )
      }
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        dispatch(updateContactAttempt(inputs, user, dmvstate));

    };

    const handleDropdown = (e) => {
    setInputs(inputs => ({ ...inputs, ["dmv_state"]: e.target.value}));
    let inputCompare = {["dmv_state"]: e.target.value}.dmv_state;
    getFormatted(inputCompare);
}

//sets a table for the users current Information
//handles change and submits user input
    return (
        <div className="container-fluid">
                <h1 className="display-4 profileTitle">Contact Details</h1>
        <div className="container">
                <div className="container currentInfoTable">
                <div className="row">
                    <div className="col-12 col-md-8  tableCol">
                    <label className="tableLabel">First Name</label>
                    <p className="colInfo">{user.firstname}</p>
                    </div>
                    <div className="col-6 col-md-4 tableCol">
                    <label className="tableLabel">Last Name</label>
                    <p className="colInfo">{user.lastname}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col tableCol">
                    <label className="tableLabel">City</label>
                    <p className="colInfo">{user.address1_city}</p>
                    </div>
                    <div className="col tableCol">
                    <label className="tableLabel">State</label>
                    <p className="colInfo">{user.dmv_state_text}</p>
                    </div>
                    <div className="col tableCol">
                    <label className="tableLabel">Postal Code</label>
                    <p className="colInfo">{user.address1_postalcode}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col tableCol">
                    <label className="tableLabel">Email Address</label>
                    <p className="colInfo">{user.emailaddress1}</p>
                    </div>
                    <div className="col tableCol">
                    <label className="tableLabel">Phone Number</label>
                    <p className="colInfo">{user.mobilephone}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-md-4  tableCol">
                    <label className="tableLabel">Date of Birth</label>
                    <p className="colInfo">{user.dmv_dateofbirth}</p>
                    </div>
                    <div className="col-12 col-md-8 tableCol">
                    <label className="tableLabel">Street Address</label>
                    <p className="colInfo">{user.address1_line1}</p>
                    </div>
                </div>
            </div>
            <Scroll />
            <form className="inputForm" name="form" onSubmit={handleSubmit}>
            {
                loginReducer.updateSuccess &&
                <SuccessBanner>
                    Contact Information Updated Successfully!
                </SuccessBanner>
            }
                <div id="updateSection" className="container inputContainer" >
                    <p className="display-4 inputTitle">Edit</p>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="firstname" value={firstname} onChange={handleChange} placeholder="First Name" className="colInput" />
                        </div>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="lastname" value={lastname} onChange={handleChange} placeholder="Last Name" className="colInput" />
                        </div>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="emailaddress1" value={emailaddress1} onChange={handleChange} placeholder="Email Address" className="colInput" />
                        </div>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="mobilephone" value={mobilephone} onChange={handleChange} placeholder="Phone Number" className="colInput"/>
                        </div>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="address1_city" value={address1_city} onChange={handleChange} placeholder="City" className="colInput" />
                        </div>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="address1_postalcode" value={address1_postalcode} onChange={handleChange} placeholder="Postal Code" className="colInput" />
                        </div>
                        <div className="form-group col inputColDiv">
                            <input type="text" name="address1_line1" value={address1_line1} onChange={handleChange} placeholder="Street Address" className="colInput" />
                        </div>
                        <div className="form-group inputColDiv">
                            <DMV_stateDropdown name="dmv_state" value={dmv_state} onChange={handleDropdown} />
                        </div>
                        <button className="btn btn-primary submitButton">
                        {loginReducer.updating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </button>
                </div>
            </form>
        </div>
    </div>

    );

}
export default ProfilePage;
