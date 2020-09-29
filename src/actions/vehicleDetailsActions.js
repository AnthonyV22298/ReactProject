import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';
import {getVehicleDetailsURL} from './getVehicleDetailsURL';
import { VEHICLEDETAILS_SUCCESSFUL, VEHICLEDETAILS_FAILURE, VEHICLEDETAILS_PENDING, DELETE_VEHICLE_REQUEST, DELETE_VEHICLE_SUCCESS, DELETE_VEHICLE_FAILED, UPDATE_VEHICLE_REQUEST, UPDATE_VEHICLE_SUCCESS, UPDATE_VEHICLE_FAILED, POST_VEHICLE_SUCCESFUL, POST_VEHICLE_FAILURE} from '../constants/actionTypes';


export const readVehicleDetails = () => {
    let config1 = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'dmv_vehicles/json',
        'Content-Type': 'dmv_vehicles/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
    };
    return dispatch => {
        //dispatch(vehicleDetailsPending());/
        console.log("LOOKATME");
        let temp = getVehicleDetailsURL();
        console.log("temp is " + temp);
        console.log("guid is" + JSON.parse(localStorage.getItem('userInfo')).contactid);
        console.log(window.value);        
        if (temp == undefined){
            console.log("tempcheck");             
            dispatch(vehicleDetailsPending());  
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                        "dmv_vehicles?$select=dmv_color,dmv_make,dmv_model,dmv_vin_number,dmv_vehicleid,dmv_register_date,dmv_expiration_date,dmv_year&$" + 
                        "filter=dmv_vehicleid%20eq%20ab0a1a76-a901-41c4-9e16-40592ede9d8e", config1)                        
            .then(res => {
                dispatch(vehicleDetailsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(vehicleDetailsFailure(error));
            });
        }else{
            dispatch(vehicleDetailsPending());
            return adalApiFetch(axios, temp, config1)
            .then(res => {
                dispatch(vehicleDetailsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(vehicleDetailsFailure(error));
            });
        }
        
    };
}

export const deleteVehicle = (guid) =>{
    let cancelConfig = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
        },
        data: {"dmv_active" : 174070001}
    }
    
    return dispatch => {
            dispatch(deleteVehicleRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_vehicles("+guid+")?$select=dmv_active" , cancelConfig)
            .then((res) => {
                dispatch(deleteVehicleSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(deleteVehicleFailed(error));
            });
        }
}

export const updateVehicle = (data) =>{
    console.log("NEW UPDATE: ")
    console.log(data)
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
            "dmv_make" : data.dmv_make,
            "dmv_model" : data.dmv_model,
            "dmv_color" : data.dmv_color,
            "dmv_year" : data.dmv_year
        }
    }
    
    return dispatch => {
            dispatch(updateVehicleRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_vehicles("+data.dmv_vehicleid+")?$select=dmv_make,dmv_model,dmv_color,dmv_year", updateConfig)
            .then((res) => {
                dispatch(updateVehicleSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateVehicleFailed(error));
            });
        }
}

export const postVehicle = (data) => {
    //let guid = JSON.parse(localStorage.getItem('userInfo')).contactid;
    console.log("NEW VEHICLE POST: ")
    console.log(data)
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
            "dmv_make": data.make,
            "dmv_model": data.model,
            "dmv_color": data.color,
            "dmv_year": data.year,
        }
    };
    
    return dispatch => {
        // using contact GUID 03879a5c-3aaf-ea11-a812-000d3a8e4ace (Contact "A Test")
        return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_vehicles", config)
            .then(res => {
                dispatch(postVehicleSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(postVehicleFailure(error));
            });
        
    };
}

const vehicleDetailsSuccess = (res) => {
    return {
        type: VEHICLEDETAILS_SUCCESSFUL,
        data:  res.data
    };
}

const vehicleDetailsFailure = (error) => {
    console.log("in vehicleD failure");
    return {
        type: VEHICLEDETAILS_FAILURE,
        error  
    };
}

const vehicleDetailsPending = () => {
    return {
        type: VEHICLEDETAILS_PENDING
    };
}

const deleteVehicleRequest = () => {
    return {
        type: DELETE_VEHICLE_REQUEST,
    };
}

const deleteVehicleSuccess = (res) => {
    return {
        type: DELETE_VEHICLE_SUCCESS,
        data:  res.data
    };
}

const deleteVehicleFailed = (error) => {
    return {
        type: DELETE_VEHICLE_FAILED,
        error  
    };
}

const postVehicleSuccess = (res) => {
    return {
        type: POST_VEHICLE_SUCCESFUL,
        data:  res.data
    };
}

const postVehicleFailure = (error) => {
    return {
        type: POST_VEHICLE_FAILURE,
        error  
    };
}

const updateVehicleRequest = () => {
    return {
        type: UPDATE_VEHICLE_REQUEST,
    };
}

const updateVehicleSuccess = (res) => {
    return {
        type: UPDATE_VEHICLE_SUCCESS,
        data:  res.data
    };
}

const updateVehicleFailed = (error) => {
    return {
        type: UPDATE_VEHICLE_FAILED,
        error  
    };
}