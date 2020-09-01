import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { APPOINTMENTS_SUCCESFUL, APPOINTMENTS_FAILURE, APPOINTMENTS_PENDING, POST_APPOINTMENTS_SUCCESFUL, POST_APPOINTMENTS_FAILURE } from '../constants/actionTypes';

export const readAppointments = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'dmv_appointment/json',
        'Content-Type': 'dmv_appointment/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
    };

    return dispatch => {
        dispatch(appointmentsPending());
        // using contact GUID 03879a5c-3aaf-ea11-a812-000d3a8e4ace (Contact "A Test")
        return adalApiFetch(axios, 
        "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments" +
        "?$select=dmv_appointmentid,dmv_appointment_date,_dmv_contactappointmentid_value" + 
        "&$filter=_dmv_contactappointmentid_value eq 03879a5c-3aaf-ea11-a812-000d3a8e4ace", config)
            .then(res => {
                dispatch(appointmentsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(appointmentsFailure(error));
            });
    };
}

export const postAppointments = (data) => {

    let config = {
        method: 'post',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'dmv_appointment/json',
        'Content-Type': 'dmv_appointment/json; charset=utf-8',
        headers: {
            'Prefer' : 'return=representation'
        },
        data: {
            "dmv_appointment_date": data.date,
            "dmv_app_type": data.type,
        }
    };
    
    return dispatch => {
        // using contact GUID 03879a5c-3aaf-ea11-a812-000d3a8e4ace (Contact "A Test")
        return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments", config)
            .then(res => {
                dispatch(postAppointmentsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(postAppointmentsFailure(error));
            });
        
    };
}

const postAppointmentsSuccess = (res) => {
    return {
        type: POST_APPOINTMENTS_SUCCESFUL,
        data:  res.data
    };
}

const postAppointmentsFailure = (error) => {
    return {
        type: POST_APPOINTMENTS_FAILURE,
        error  
    };
}

const appointmentsSuccess = (res) => {
    return {
        type: APPOINTMENTS_SUCCESFUL,
        data:  res.data
    };
}

const appointmentsFailure = (error) => {
    return {
        type: APPOINTMENTS_FAILURE,
        error  
    };
}

const appointmentsPending = () => {
    return {
        type: APPOINTMENTS_PENDING
    };
}
