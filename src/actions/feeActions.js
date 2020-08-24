import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { FEES_SUCCESFUL, FEES_FAILURE, FEES_PENDING} from '../constants/actionTypes';

export const readFees = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'dmv_fees/json',
        'Content-Type': 'dmv_fee/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
    };

    return dispatch => {
        dispatch(feesPending());
        // using contact GUID 03879a5c-3aaf-ea11-a812-000d3a8e4ace (Contact "A Test")
        return adalApiFetch(axios, 
        "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_fees" +
        "?$select=dmv_feeid,_dmv_contact_value,dmv_name,dmv_cost,dmv_purpose" + 
        "&$filter=_dmv_contact_value eq 03879a5c-3aaf-ea11-a812-000d3a8e4ace", config)
            .then(res => {
                dispatch(feesSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(feesFailure(error));
            });
    };
}




const feesSuccess = (res) => {
    return {
        type: FEES_SUCCESFUL,
        data:  res.data
    };
}

const feesFailure = (error) => {
    return {
        type: FEES_FAILURE,
        error  
    };
}

const feesPending = () => {
    return {
        type: FEES_PENDING
    };
}