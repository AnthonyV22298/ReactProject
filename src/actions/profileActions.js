import { UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_FAILED, UPDATE_CONTACT_SUCCESS} from '../constants/actionTypes';
import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';

//takes in user input from the profile page
export const updateContactAttempt = (userInfo) => {
    let userToken = JSON.parse(localStorage.getItem('token'));
    let updateConfig = (data) => {
        return {
            method: 'patch',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            headers: {
                'Prefer': "odata.include-annotations=*"
            },
            data: data
        }
    }
    return dispatch => {
        //query to dynamics based on stored contactid
        //updates the field value of the submitted input
            dispatch(updateContactRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts(" + userToken.contactid + ")", updateConfig(userInfo))
            .then((res) => {
                console.log(res);
                //sets data for values for current state
                const data = {
                    contactid: userToken.contactid,
                    dmv_socialsecuritynumber: userToken.dmv_socialsecuritynumber,
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    emailaddress1: userInfo.emailaddress1,
                    address1_line1: userInfo.address1_line1,
                    address1_city: userInfo.address1_city,
                    address1_postalcode: userInfo.address1_postalcode,
                    mobilephone: userInfo.mobilephone,
                    dmv_state: userToken.dmv_state,
                    dmv_dateofbirth: userToken.dmv_dateofbirth
                };
                //update local storage token and current user state
                localStorage.setItem('token', JSON.stringify(data));
                dispatch(updateContactSuccess(data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateContactFailed(error));
            });
        }
    };





const updateContactRequest = () => {
    return {
        type: UPDATE_CONTACT_REQUEST,
    };
}

export const updateContactSuccess = (userInfo) => {
    return {
        type: UPDATE_CONTACT_SUCCESS,
        userInfo: userInfo,
    }
}

const updateContactFailed = (error) => {
  return {
    type: UPDATE_CONTACT_FAILED,
    error
  };
};