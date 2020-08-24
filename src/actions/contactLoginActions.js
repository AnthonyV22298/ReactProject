import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';


import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_PENDING} from '../constants/actionTypes';





export const readContacts = () => {

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
        dispatch(loginPending());
        return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts?$select=firstname,dmv_socialsecuritynumber", config)
            .then(res => {
                dispatch(loginSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(loginFailure(error));
            });
    };
}




const loginSuccess = (res) => {
    return {
        type: LOGIN_SUCCESS,
        data:  res.data
    };
}

const loginFailure = (error) => {
    return {
        type: LOGIN_FAILED,
        error
    };
}

const loginPending = () => {
    return {
        type: LOGIN_PENDING
    };
}
