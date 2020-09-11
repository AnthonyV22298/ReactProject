import { INFO_REQUEST_FAILURE, INFO_REQUEST_PENDING, INFO_INSURANCE_SUCCESSFUL} from '../constants/actionTypes';

export default function insuranceReducer(state= {}, action) {
    switch (action.type) {
        case INFO_REQUEST_FAILURE:
            return {...state, 
                //information: null,
                requestState: {
                    infoPending: false,
                    infoSuccessful: false,
                    infoFailed: true,
                    error: action.err
                }
            }
        case INFO_REQUEST_PENDING:
            return {...state, 
                //information: null,
                requestState: {
                    infoPending: true,
                    infoSuccessful: false,
                    infoFailed: false,
                    error: null
                }
            }
        case INFO_INSURANCE_SUCCESSFUL:
            console.log("INFO_INSURANCE_SUCCESSFUL");
            console.log(state);
            return {...state, 
                information: {...state.information,
                    INSURANCE: action.data,
                },
                requestState: {
                    infoPending: false,
                    infoSuccessful: true,
                    infoFailed: false,
                    error: null
                }
            }
        default:
            return state;
    }
}