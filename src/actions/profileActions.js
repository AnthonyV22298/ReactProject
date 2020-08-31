import { UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_FAILED, UPDATE_CONTACT_SUCCESS} from '../constants/actionTypes';
import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';


//takes in user input from the profile page
export const updateContactAttempt = (userInfo, user) => {
    //let userToken = localStorage.getItem('guid');
    //let tes = authenticate();
    let guid = user.contactid;
    console.log(guid)
    //let guid = useSelector(state => state.loginReducer.userInfo.contactid);

    let updateConfig = (data) => {
        return {
            method: 'patch',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            headers: {
                'Prefer': "odata.include-annotations=*"
            },
            data: data
        }
    }
    return dispatch => {
        console.log("this is guid in profile:   " + guid);
        //query to dynamics based on stored contactid
        //updates the field value of the submitted input
            dispatch(updateContactRequest());
            return adalApiFetch(axios, "https://sstack4.crm.dynamics.com/api/data/v9.1/contacts(" + guid + ")", updateConfig(userInfo))
            .then((res) => {
                console.log("this is res data: " + JSON.stringify(res));
                const data = {
                    contactid: guid,
                    dmv_socialsecuritynumber: user.dmv_socialsecuritynumber,
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    emailaddress1: userInfo.emailaddress1,
                    address1_line1: userInfo.address1_line1,
                    address1_city: userInfo.address1_city,
                    address1_postalcode: userInfo.address1_postalcode,
                    mobilephone: userInfo.mobilephone,
                    dmv_state: userInfo.dmv_state,
                    dmv_dateofbirth: user.dmv_dateofbirth
                };
                console.log("this is state" + data.dmv_state);

                //update local storage token and current user state
                localStorage.setItem('userInfo', JSON.stringify(data));
                dispatch(updateContactSuccess(data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateContactFailed(error));
            });
        }

};




const updateContactRequest = () => {
    return {
        type: UPDATE_CONTACT_REQUEST,
    };
}

const updateContactSuccess = (userInfo) => {
    return {
        type: UPDATE_CONTACT_SUCCESS,
        userInfo: userInfo,
    }
}

const updateContactFailed = (error) => {
  return {
    type: UPDATE_CONTACT_FAILED,
    error
  };
};

