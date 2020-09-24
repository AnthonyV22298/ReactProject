import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { INFODMV_SUCCESSFUL, INFODMV_FAILURE, INFODMV_PENDING} from '../constants/actionTypes';

export const readInfoDMV = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'crefc_locations/json',
        'Content-Type': 'crefc_location/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
    };

    //https://sstack4.crm.dynamics.com/api/data/v9.1/crefc_locations?$select=crefc_locationname,crefc_addressline1,crefc_state,crefc_zipcode,crefc_phonenumber,crefc_faxnumber,crefc_primaryemail

    return dispatch => {
        dispatch(infoDMVPending());
        return adalApiFetch(axios, 
        "https://sstack4.crm.dynamics.com/api/data/v9.1/crefc_locations?$select=" + 
        "crefc_locationname,crefc_addressline1,crefc_state,crefc_zipcode,crefc_phonenumber," + 
        "crefc_faxnumber,crefc_primaryemail", config)
            .then(res => {                 
                dispatch(infoDMVSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(infoDMVFailure(error));
            });
    };
}




const infoDMVSuccess = (res) => {
    return {
        type: INFODMV_SUCCESSFUL,
        data:  res.data
    };
}

const infoDMVFailure = (error) => {
    return {
        type: INFODMV_FAILURE,
        error  
    };
}

const infoDMVPending = () => {
    return {
        type: INFODMV_PENDING
    };
}