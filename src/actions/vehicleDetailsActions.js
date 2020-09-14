import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';
import {VRegCheckAdal} from './getVehicleDetailsURL.js';
import { VEHICLEDETAILS_SUCCESSFUL, VEHICLEDETAILS_FAILURE, VEHICLEDETAILS_PENDING} from '../constants/actionTypes';

export const readVehicleDetails = () => {
    return dispatch => {
        //dispatch(vehicleDetailsPending());/
        console.log("LOOKATME");
        //let temp = getVehicleDetailsURL();
        //console.log("temp is " + temp);
        console.log("guid is" + JSON.parse(localStorage.getItem('userInfo')).contactid);
        //console.log(window.value);        
        //console.log(localStorage);     
        dispatch(vehicleDetailsPending());  
        ///
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
        let config2 = {
            method: 'get',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            Accept: 'dmv_contacthasvehicles/json',
            'Content-Type': 'dmv_contacthasvehicles/json; charset=utf-8', 
            headers: {
            'Prefer': "odata.include-annotations=*"
            }
        };  
                    
        let godURL;
        let thisGuid = JSON.parse(localStorage.getItem('userInfo')).contactid;
        let urlBase1 = "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                        "dmv_contacthasvehicles?$select=_dmv_vehiclerecordid_value&$" +
                        "filter=_dmv_contactrecordid_value%20eq%20";
        let vRecordsURL = urlBase1.concat(thisGuid);   
    
        console.log("before apifetchxxxx");
        console.log("vrecordsURLxxxx = " + vRecordsURL);
        console.log("config2xxxx = " + config2);
    
        adalApiFetch(axios, vRecordsURL, config2)
        .then(results => {     
            console.log("inside .then API fetchxxxx");              
            let vRecordsArr = [];
            let urlArray = []; 
            let vRecordsArrLen = results.data.value.length;
            let urlBase2 = "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                            "dmv_vehicles?$select=dmv_register_date,dmv_expiration_date,dmv_year,dmv_color,dmv_make," + 
                            "dmv_model,dmv_vin_number,dmv_vehicleid&$filter=dmv_vehicleid%20eq%20";    
                            
            for (let i = 0; i < vRecordsArrLen; i++){
                vRecordsArr.push(results.data.value[i]._dmv_vehiclerecordid_value);                
                urlArray.push(urlBase2.concat(vRecordsArr[i]));   
            }
                            
            godURL = urlArray[0];
    
            console.log("urlArraygodURLxxx = " + godURL);
            for (let j = 0; j < vRecordsArrLen; j++){	
                if (j > 0){
                    godURL = godURL.concat("+or+dmv_vehicleid%20eq%20", vRecordsArr[j]);
                }	                        
            }
            console.log("reaches first returnxxx");
            console.log(godURL);             
            //using window value due to this value being within an adal fetch
            adalApiFetch(axios, godURL, config1)     
            .then(res => {
                dispatch(vehicleDetailsSuccess(res));                
                VRegCheckAdal(vRecordsArrLen, godURL, config1);   
            })
            .catch((error) => {
                console.log(error);
                dispatch(vehicleDetailsFailure(error));
            });      
        })
        .catch((error) => {
            console.log("eeee");
            console.log(error);
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