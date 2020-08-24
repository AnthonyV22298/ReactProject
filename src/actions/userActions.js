import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGOUT} from '../constants/actionTypes';
import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';

export const logoutAttempt = () => {
    // remove user from local storage to log user out

    return (dispatch) => {
        dispatch(logout());
        localStorage.removeItem('token');
    };
}

export const loginAttempt = (userInfo) => {
    console.log("fired")
    console.log(userInfo)


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
        console.log("pastdispatch");
            dispatch(loginRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts?$select=contactid,dmv_socialsecuritynumber,firstname,lastname,address1_city,dmv_dateofbirth" +
            "&$filter=dmv_socialsecuritynumber eq '" + userInfo.ssn + "' " +
            "and firstname eq '" + userInfo.firstname + "'", config)
            .then((res) => {
                if(res.data.value.length){
                    const user = res.data.value[0]
                    console.log("user in userActions" + user.dmv_socialsecuritynumber + user.firstname );
                    dispatch(loginSuccess(user))
                    localStorage.setItem('token', JSON.stringify(user));
                    localStorage.setItem('contactid', user.contactid);

                } else {
                        console.log(loginFailed())
                }
            })
        }
    };

const loginSuccess = (userInfo) => {
    return {
      type: LOGIN_SUCCESS,
      userInfo: {
        dmv_socialsecuritynumber: userInfo.dmv_socialsecuritynumber,
        firstname: userInfo.firstname,
        contactid: userInfo.contactid,
        lastname: userInfo.lastname,
        address1_city: userInfo.address1_city,
        dmv_dateofbirth: userInfo.dmv_dateofbirth
      },
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
