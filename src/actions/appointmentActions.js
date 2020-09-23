import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { APPOINTMENTS_SUCCESFUL, APPOINTMENTS_FAILURE, APPOINTMENTS_PENDING, POST_APPOINTMENTS_SUCCESFUL, POST_APPOINTMENTS_FAILURE, CANCEL_APPOINTMENT_REQUEST, CANCEL_APPOINTMENT_SUCCESS, CANCEL_APPOINTMENT_FAILED, UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILED, APPDATE_SUCCESFUL, APPDATE_FAILURE, APPDATE_PENDING} from '../constants/actionTypes';

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
        let guid = JSON.parse(localStorage.getItem('userInfo')).contactid;
        return adalApiFetch(axios, 
        "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments" +
        "?$select=dmv_appointmentid,dmv_app_type,dmv_time,dmv_approved,_dmv_appointmentlocation_value,dmv_appointment_date,_dmv_contactappointmentid_value" + 
        "&$filter=_dmv_contactappointmentid_value eq '" + guid + "' and dmv_isactive ne 174070001", config)
            .then(res => {
                dispatch(appointmentsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(appointmentsFailure(error));
            });
    };
}

export const readDates = () => {

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
        dispatch(appdatesPending());
        return adalApiFetch(axios, 
        "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments" +
        "?$select=dmv_appointment_date,dmv_time", config)
            .then(res => {
                dispatch(appdatesSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(appdatesFailure(error));
            });
    };
}

export const postAppointments = (data) => {
    let guid = JSON.parse(localStorage.getItem('userInfo')).contactid;
    console.log("date = " + data.date);
    console.log("app type = " + data.type);
    console.log("app time = " + data.time);
    console.log("location = " + "/crefc_locations("+data.location+")");
    console.log("contact lookup = " + "/contacts("+guid+")");
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
            "dmv_contactAppointmentId@odata.bind": "/contacts("+guid+")",
            "dmv_appointment_date": data.date,
            "dmv_app_type": data.type,
            "dmv_AppointmentLocation@odata.bind": "/crefc_locations("+data.location+")",
            "dmv_time": data.time
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

export const updateAppointment = (data) =>{
    console.log(data)
    console.log("new location: " + data._dmv_appointmentlocation_value)
    let updateConfig = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        },
        data: {
            "dmv_app_type" : data.dmv_app_type,
            "dmv_time" : data.dmv_time,
            "dmv_AppointmentLocation@odata.bind": "/crefc_locations("+data._dmv_appointmentlocation_value+")",
            "dmv_appointment_date": data.dmv_appointment_date,
            "dmv_approved" : 174070000
        }
    }
    
    return dispatch => {
            dispatch(updateAppointmentRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments("+data.dmv_appointmentid+")?$select=dmv_app_type,dmv_time,_dmv_appointmentlocation_value,dmv_appointment_date", updateConfig)
            .then((res) => {
                dispatch(updateAppointmentSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateAppointmentFailed(error));
            });
        }
}

export const cancelAppointment = (guid) =>{
    let cancelConfig = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        },
        data: {"dmv_isactive" : 174070001}
    }
    
    return dispatch => {
            dispatch(cancelAppointmentRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments("+guid+")?$select=dmv_isactive" , cancelConfig)
            .then((res) => {
                dispatch(cancelAppointmentSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(cancelAppointmentFailed(error));
            });
        }
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

const updateAppointmentRequest = () => {
    return {
        type: UPDATE_APPOINTMENT_REQUEST,
    };
}

const updateAppointmentSuccess = (res) => {
    return {
        type: UPDATE_APPOINTMENT_SUCCESS,
        data:  res.data
    };
}

const updateAppointmentFailed = (error) => {
    return {
        type: UPDATE_APPOINTMENT_FAILED,
        error  
    };
}

const cancelAppointmentRequest = () => {
    return {
        type: CANCEL_APPOINTMENT_REQUEST,
    };
}

const cancelAppointmentSuccess = (res) => {
    return {
        type: CANCEL_APPOINTMENT_SUCCESS,
        data:  res.data
    };
}

const cancelAppointmentFailed = (error) => {
    return {
        type: CANCEL_APPOINTMENT_FAILED,
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

const appdatesSuccess = (res) => {
    return {
        type: APPDATE_SUCCESFUL,
        data:  res.data
    };
}

const appdatesFailure = (error) => {
    return {
        type: APPDATE_FAILURE,
        error  
    };
}

const appdatesPending = () => {
    return {
        type: APPDATE_PENDING
    };
}
