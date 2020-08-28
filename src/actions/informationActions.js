import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';

import { INFO_LICENSE_SUCCESSFUL, INFO_REQUEST_PENDING, INFO_REQUEST_FAILURE, SWITCH_INFORMATION_VIEW, INFO_CITATIONS_SUCCESSFUL } from '../constants/actionTypes';
import { INFO_LICENSE, INFO_CITATIONS } from '../constants/viewNames.js';

let config = {
    method: 'get',
    'OData-MaxVersion': 4.0,
    'OData-Version': 4.0,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    headers: {
        'Prefer': "odata.include-annotations=*"
    }
};

export const readLicense = (userId) => {
    return dispatch => {
        dispatch(infoRequestPending());
        const apiCall = "https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_driverslicenses?$select=dmv_ispermit,dmv_licenseclassupdated,dmv_licenseexpdate,dmv_licenseeye,dmv_licensehair,dmv_licenseheight,dmv_licenseissuedate,dmv_licenseorgandonor,dmv_licenseweight,dmv_name,dmv_reactivationdate,_dmv_testholdingcontact_value,dmv_usstates,statecode,dmv_licenserestrictions,dmv_licenseendorsements&$filter=statecode eq 0 and _dmv_testholdingcontact_value eq " 
            + userId;
        adalApiFetch(axios, apiCall, config).then(res => {
            //Eventually Read the HoldingContact In order to display their name (May be uneccesary once we have logged in Contacts)
            dispatch(infoLicenseSuccessful(res));
        }).catch(err => {
            dispatch(infoRequestFailure(err));
        })

    };
}

export const readCitations = (userId) => {
    return dispatch => {
        dispatch(infoRequestPending());
        const apiCall = "https://sstack4.crm.dynamics.com/api/data/v9.1/crefc_driving_histories?$select=_dmv_driving_history_contact_id_value,dmv_license_status,dmv_suspensions,dmv_total_points,dmv_total_points_state&$expand=dmv_driving_history_dmv_citations_driving_history($select=crefc_citationsid,dmv_citation_number,dmv_conviction_date,dmv_court,dmv_date_received,dmv_details,dmv_driving_history,dmv_location,dmv_order_of_suspension,dmv_points,dmv_type_of_ticket)&$filter=_dmv_driving_history_contact_id_value eq "
            + userId;
        adalApiFetch(axios, apiCall,
        config).then(res => {
            //Eventually work with logged in user
            dispatch(infoCitationsSuccessful(res));
        }).catch(err => {
            dispatch(infoRequestFailure(err));
        })
    };
}

export const switchView = (viewname) => {
    return dispatch => {
        dispatch(switchViewAction(viewname));
        //dispatch more actions types for each view, call readLicense for that view and create new ones for readCitation as an example
    }
}

export const readData = (userId, viewToRead) => {
    return dispatch => {
            switch(viewToRead) {
                case INFO_LICENSE:
                    dispatch(readLicense(userId));
                    break;
                case INFO_CITATIONS:
                    dispatch(readCitations(userId));
                    break;
                default:
                    break;
            }
    }
}

const infoCitationsSuccessful = (res = {}) => {
    console.log(res);
    return {
        type: INFO_CITATIONS_SUCCESSFUL,
        data: res.data.value[0]

    }
}
const infoLicenseSuccessful = (res = {}) => {
    return {
        type: INFO_LICENSE_SUCCESSFUL,
        data: res.data.value[0]
    }
}

const infoRequestPending = () => {
    return { type: INFO_REQUEST_PENDING }
}

const infoRequestFailure = (err) => {
    return {
        type: INFO_REQUEST_FAILURE,
        err
    }
}

const switchViewAction = (viewname) => {
    return {
        type: SWITCH_INFORMATION_VIEW,
        newView: viewname,
    }
}