import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';
import {getVehicleDetailsURL} from './getVehicleDetailsURL';
import { VEHICLEDETAILS_SUCCESSFUL, VEHICLEDETAILS_FAILURE, VEHICLEDETAILS_PENDING} from '../constants/actionTypes';


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
        dispatch(vehicleDetailsPending());
        console.log("LOOKATME");
        let temp = getVehicleDetailsURL();
        console.log("temp is " + temp);
        console.log("guid is" + JSON.parse(localStorage.getItem('userInfo')).contactid);
        if (temp == undefined){
            console.log("tempcheck");
            //return adalApiFetch(axios, temp, config1)            
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                        "dmv_vehicles?$select=dmv_color,dmv_make,dmv_model,dmv_vin_number,dmv_vehicleid&$" + 
                        "filter=dmv_vehicleid%20eq%20ab0a1a76-a901-41c4-9e16-40592ede9d8e", config1)                        
            .then(res => {
                dispatch(vehicleDetailsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(vehicleDetailsFailure(error));
            });
        }else{
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