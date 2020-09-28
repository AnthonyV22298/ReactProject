import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';
import {getVehicleDetailsURL} from './getVehicleDetailsURL';
import { VEHICLEDETAILS_SUCCESSFUL, VEHICLEDETAILS_FAILURE, VEHICLEDETAILS_PENDING, DELETE_VEHICLE_REQUEST, DELETE_VEHICLE_SUCCESS, DELETE_VEHICLE_FAILED} from '../constants/actionTypes';


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
                        "dmv_vehicles?$select=dmv_color,dmv_make,dmv_model,dmv_vin_number,dmv_vehicleid,dmv_register_date,dmv_expiration_date&$" + 
                        "filter=dmv_vehicleid%20eq%20ab0a1a76-a901-41c4-9e16-40592ede9d8e and dmv_isactive ne 174070001", config1)                        
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
        data: {"dmv_isactive" : 174070001}
    }
    
    return dispatch => {
            dispatch(deleteVehicleRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_vehicle("+guid+")?$select=dmv_isactive" , cancelConfig)
            .then((res) => {
                dispatch(deleteVehicleSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(deleteVehicleFailed(error));
            });
        }
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