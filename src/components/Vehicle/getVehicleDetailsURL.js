import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';
import {VEHICLEDETAILS_PENDING} from '../constants/actionTypes';


export const getVehicleDetailsURL = () => {    	
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
    }    
    var dispatch = function () {
      
    	let godURL;
        dispatch(vehicleDetailsPending()); 
        let thisGuid = JSON.parse(localStorage.getItem('userInfo')).contactid;
        let urlBase1 = "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                        "dmv_contacthasvehicles?$select=_dmv_vehiclerecordid_value&$" +
                        "filter=_dmv_contactrecordid_value%20eq%20";
        let vRecordsURL = urlBase1.concat(thisGuid);   

        let apiFetch = adalApiFetch(axios, vRecordsURL, config2)
        .then(results => {                  
            let vRecordsArr = [];
            let urlArray = []; 
            let vRecordsArrLen = results.data.value.length;
            let urlBase2 = "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                            "dmv_vehicles?$select=dmv_register_date,dmv_expiration_date,dmv_year,dmv_color,dmv_make," + 
                            "dmv_model,dmv_vin_number,dmv_vehicleid&$filter=dmv_vehicleid%20eq%20";            
            for (let i = 0; i < vRecordsArrLen; i++){
                vRecordsArr.push(results.data.value[i]._dmv_vehiclerecordid_value);                
                urlArray.push(urlBase2.concat(vRecordsArr[i]));   
            }		//ONE FOR LOOP
             
            /*
            let today = new Date();   
            console.log(typeof today);
            for (let i = 0; i < vRecordsArrLen; i++){
                console.log(typeof results.data.value[i].dmv_expiration_date);
                if (results.data.value[i].dmv_expiration_date > today){
                    alert("You have an expired registration!");
                }   
            } 
            */                        
            for (let i = 0; i < vRecordsArrLen; i++){
                let apiFetch = adalApiFetch(axios, urlArray[i], config1)
                .then(results => {                   
                    godURL = urlArray[0];
                    for (let j = 0; j < vRecordsArrLen; j++){	
                        if (j > 0){
                            godURL = godURL.concat("+or+dmv_vehicleid%20eq%20", vRecordsArr[j]);
                        }	                        
                    }
                    console.log("reaches first return");
                  	return godURL;
                })
                .catch((error) => {
                    console.log(error);
                });         
            }
        })
        .catch((error) => {
            console.log(error);
        });   
    console.log("reaches second return");          
    return godURL};  
}
const vehicleDetailsPending = () => {
    return {
        type: VEHICLEDETAILS_PENDING
    };
}

export default VehicleDetailsRender;