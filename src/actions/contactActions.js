import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { CONTACTS_SUCCESFUL, CONTACTS_FAILURE, CONTACTS_PENDING} from '../constants/actionTypes';

export const readContacts = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=\"*\""
        }
    };

    return dispatch => {
        dispatch(contactsPending());

        return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts?$select=firstname,lastname,emailaddress1,contactid,dmv_state&$filter=contains(firstname,'A')", config)
            .then(res => {
                dispatch(contactsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(contactsFailure(error));
            });
    };
}




const contactsSuccess = (res) => {
    return {
        type: CONTACTS_SUCCESFUL,
        data:  res.data
    };
}

const contactsFailure = (error) => {
    return {
        type: CONTACTS_FAILURE,
        error  
    };
}

const contactsPending = () => {
    return {
        type: CONTACTS_PENDING
    };
}