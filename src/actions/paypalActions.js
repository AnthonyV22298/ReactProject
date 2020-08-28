import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { PAYMENT_FOUND, PAYMENT_NOT_FOUND, FINDING_PAYMENT } from "../constants/actionTypes";

export const findPayment = () => {

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
        dispatch(findingPayment());
        // using contact GUID 03879a5c-3aaf-ea11-a812-000d3a8e4ace (Contact "A Test")
        return adalApiFetch(axios, 
        "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_fees" +
        "?$select=dmv_cost" + 
        "&$filter=dmv_feeid eq dc4c98b7-2ccd-ea11-a812-000d3a530323", config)
            .then(res => {
                dispatch(paymentFound(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(paymentNotFound(error));
            });
    };
}

const paymentFound = (res) => {
    return {
        type: PAYMENT_FOUND,
        data:  res.data
    };
}

const paymentNotFound = (error) => {
    return {
        type: PAYMENT_NOT_FOUND,
        error  
    };
}

const findingPayment = () => {
    return {
        type: FINDING_PAYMENT
    };
}