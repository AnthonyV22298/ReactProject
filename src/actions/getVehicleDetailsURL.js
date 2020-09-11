import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';


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
    };  
        
    let godURL;
    let thisGuid = JSON.parse(localStorage.getItem('userInfo')).contactid;
    let urlBase1 = "https://sstack4.crm.dynamics.com/api/data/v9.1/" + 
                    "dmv_contacthasvehicles?$select=_dmv_vehiclerecordid_value&$" +
                    "filter=_dmv_contactrecordid_value%20eq%20";
    let vRecordsURL = urlBase1.concat(thisGuid);   

    console.log("before apifetch");
    
    let apiFetch = adalApiFetch(axios, vRecordsURL, config2)
    .then(results => {     
        console.log("inside .then API fetch");              
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

        
        /*    
        for (let i = 0; i < vRecordsArrLen; i++){
            console.log(typeof results.data.value[i].dmv_expiration_date);
            if (results.data.value[i].dmv_expiration_date > today){
                alert("You have an expired registration!");
            }   
        } 
        */       

        //for (let i = 0; i < 1; i++){
            //let apiFetch = adalApiFetch(axios, urlArray[i], config1)
            //.then(results => {                   
                godURL = urlArray[0];

                console.log("urlArraygodURL = " + godURL);
                for (let j = 0; j < vRecordsArrLen; j++){	
                    if (j > 0){
                        godURL = godURL.concat("+or+dmv_vehicleid%20eq%20", vRecordsArr[j]);
                    }	                        
                }
                console.log("reaches first return");
                console.log(godURL);
                let apiFetch = adalApiFetch(axios, godURL, config1)
                .then(results => {                          
                    let today = new Date();
                    let loopflag = 1;
                    for (let i = 0; i < vRecordsArrLen; i++){      
                        if (results.data.value[i].dmv_expiration_date != null){
                            let tempYear = results.data.value[i].dmv_expiration_date.slice(0, 4);                         
                            let tempMonth = results.data.value[i].dmv_expiration_date.slice(5, 7);                                                  
                            let tempDay = results.data.value[i].dmv_expiration_date.slice(8, 10);    
                            let parsedDate = new Date(tempYear, tempMonth, tempDay);
                            if (parsedDate > today && loopflag == 1){
                                loopflag = 0;
                                alert("You have an expired registration!");
                            }                        
                            //console.log(tempYear + " " + tempMonth + " " + tempDay);
                            //console.log(results.data.value[i].dmv_expiration_date);  
                        }                      
                    }                         	
                })          
                .catch((error) => {
                    console.log(error);
                }); 
                window.value = godURL;
                //return "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_vehicles?$select=dmv_color,dmv_make,dmv_model,dmv_vin_number&$filter=dmv_vehicleid%20eq%2047b4a301-4b78-4d60-a6e0-cefc91970b52+or+dmv_vehicleid%20eq%20ee27cd1b-2eac-ea11-a812-000d3a8e4ace+or+dmv_vehicleid%20eq%20e097a0c3-eaaf-ea11-a812-000d3a53014b";      
                //return godURL;
            //})
            //.catch((error) => {
            //    console.log(error);
            //});         
        //}
    })
    .catch((error) => {
        console.log(error);
    });   
    console.log("reaches second return" + godURL);    
    //return "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_vehicles?$select=dmv_color,dmv_make,dmv_model,dmv_vin_number&$filter=dmv_vehicleid%20eq%2047b4a301-4b78-4d60-a6e0-cefc91970b52+or+dmv_vehicleid%20eq%20ee27cd1b-2eac-ea11-a812-000d3a8e4ace+or+dmv_vehicleid%20eq%20e097a0c3-eaaf-ea11-a812-000d3a53014b";      
    //return godURL; 
    console.log("window value = " + window.value);
    return window.value;
}

export default getVehicleDetailsURL;