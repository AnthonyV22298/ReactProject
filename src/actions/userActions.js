import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGOUT} from '../constants/actionTypes';
import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';

//import { store } from 'redux/store';
//import { storeAuthToken } from './authTokenConfig';
//import { store } from '../main.js';


export const logoutAttempt = () => {
    // remove user from local storage to log user out

    return (dispatch) => {
        dispatch(logout());
        localStorage.removeItem('userInfo');
    };
};

export const loginAttempt = (userInfo) => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
    };
    return dispatch => {




        //runs a query on contact information
        //filters information based on user input
            dispatch(loginRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts?$select=contactid,dmv_socialsecuritynumber,firstname,dmv_state,lastname,address1_city,address1_line1,dmv_state,dmv_dateofbirth,address1_postalcode,mobilephone,emailaddress1" +
           "&$filter=dmv_socialsecuritynumber eq '" + userInfo.ssn + "' " +
           "and emailaddress1 eq '" + userInfo.emailaddress1 + "'", config)
            .then((res) => {
                if(res.data.value.length){
                    //sets property name and value based on query results
                    const userInfo = res.data.value[0];

                    const data = {
                        contactid: userInfo.contactid,
                        dmv_socialsecuritynumber: userInfo.dmv_socialsecuritynumber,
                        firstname: userInfo.firstname,
                        lastname: userInfo.lastname,
                        emailaddress1: userInfo.emailaddress1,
                        address1_line1: userInfo.address1_line1,
                        address1_city: userInfo.address1_city,
                        address1_postalcode: userInfo.address1_postalcode,
                        mobilephone: userInfo.mobilephone,
                        dmv_state: userInfo["dmv_state@OData.Community.Display.V1.FormattedValue"],
                        dmv_dateofbirth: userInfo["dmv_dateofbirth@OData.Community.Display.V1.FormattedValue"]
                    }

                    //sets localstoreage token to save user information
                    //localStorage.setItem('token', JSON.stringify(data));
                    console.log("this is login data" + data.emailaddress1);
                    //store.dispatch(storeAuthToken(data));
                    dispatch(loginSuccess(data));
                    localStorage.setItem('userInfo', JSON.stringify(data));




                } else {
                    dispatch(loginFailed());
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

const loginSuccess = (userInfo) => {

    return {
        type: LOGIN_SUCCESS,
        userInfo: userInfo,
    }
}

const loginFailed = () => {
    return {
        type: LOGIN_FAILED,
    };
}
const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    };
}
const logout = () => {
  return {
    type: LOGOUT,
  };
};
