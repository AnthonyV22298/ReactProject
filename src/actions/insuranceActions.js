import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';

import { INFO_INSURANCE_SUCCESSFUL, INFO_REQUEST_PENDING, INFO_REQUEST_FAILURE} from '../constants/actionTypes';

let config = {
    method: 'get',
    'OData-MaxVersion': 4.0,
    'OData-Version': 4.0,
    Accept: 'dmv_providers/json',
    'Content-Type': 'dmv_provider/json; charset=utf-8',
    headers: {
        'Prefer': "odata.include-annotations=*"
    }
};

export const readInsurance = (contactId) => {
    //let contactId = JSON.parse(localStorage.getItem('userInfo')).contactid; 
    return dispatch => {
        dispatch(infoRequestPending());
        const apiCall = "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts("+contactId+")?$select=_dmv_insurance_contactid_value,_dmv_insurance_contactid_value" 
        adalApiFetch(axios, apiCall, config).then(res1 => {
            console.log("CONTACT INFO:");
            console.log(res1.data);
            let insuranceId = res1.data._dmv_insurance_contactid_value;
            let policyNo = res1.data["_dmv_insurance_contactid_value@OData.Community.Display.V1.FormattedValue"];
            const apiCall = "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_insurances("+insuranceId+")?$select=_dmv_insuranceprovider_value" 
            adalApiFetch(axios, apiCall, config).then(res2 => {
                console.log("INSURANCE INFO");
                console.log(res2.data);
                let providerId = res2.data._dmv_insuranceprovider_value;
                const apiCall = "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_providers("+ providerId +")" ;
                adalApiFetch(axios, apiCall, config).then(res3 => {
                    console.log("PROVIDER INFO:");
                    res3.data.dmv_policyno = policyNo;
                    console.log(res3.data);
                    dispatch(infoInsuranceSuccessful(res3));
                }).catch(err => {
                    dispatch(infoRequestFailure(err));
                });
            }).catch(() => {
                dispatch(infoInsuranceNull());
            });
        }).catch(err => {
            dispatch(infoRequestFailure(err));
        });
    }
}

const infoInsuranceSuccessful = (res = {}) => {
    console.log(res);
    return {
        type: INFO_INSURANCE_SUCCESSFUL,
        data: res.data
    }
}

const infoRequestPending = () => {
    return { type: INFO_REQUEST_PENDING }
}

const infoRequestFailure = (err) => {
    return {
        type: INFO_REQUEST_FAILURE,
        err
    }
}
const infoInsuranceNull = () => {
    return {
        type: INFO_INSURANCE_SUCCESSFUL,
        data: null
    }
}