import { INFO_REQUEST_FAILURE, INFO_REQUEST_PENDING, INFO_LICENSE_SUCCESSFUL, SWITCH_INFORMATION_VIEW, INFO_CITATIONS_SUCCESSFUL } from '../constants/actionTypes';
//import { INFO_LICENSE } from '../constants/viewNames';
// const initialState = {
//     information: null,
//     infoView: INFO_LICENSE,
//     requestState: {
//         infoPending: true,
//         infoSuccessful: false,
//         infoFailed: false,
//         error: null
//     }
// }
export default function informationReducer(state= {}, action) {
    switch (action.type) {
        case INFO_REQUEST_FAILURE:
            return {...state, 
                information: null,
                requestState: {
                    infoPending: false,
                    infoSuccessful: false,
                    infoFailed: true,
                    error: action.err
                }
            }
        case INFO_REQUEST_PENDING:
            return {...state, 
                information: null,
                requestState: {
                    infoPending: true,
                    infoSuccessful: false,
                    infoFailed: false,
                    error: null
                }
            }
        case INFO_CITATIONS_SUCCESSFUL:
            return {...state,
                information: {...state.information,
                    citations: action.data
                },
                requestState: {
                    infoPending: false,
                    infoSuccessful: true,
                    infoFailed: false,
                    error: null
                }
            }
        case INFO_LICENSE_SUCCESSFUL:
            return {...state, 
                information: {...state.information,
                    license: action.data,
                },
                requestState: {
                    infoPending: false,
                    infoSuccessful: true,
                    infoFailed: false,
                    error: null
                }
            }
        case SWITCH_INFORMATION_VIEW: 
            return {...state,
                infoView: action.newView
            }
        default:
            return state;
    }
}