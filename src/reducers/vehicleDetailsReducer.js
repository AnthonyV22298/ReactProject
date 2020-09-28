import { VEHICLEDETAILS_SUCCESSFUL, VEHICLEDETAILS_PENDING, VEHICLEDETAILS_FAILURE, DELETE_VEHICLE_REQUEST, DELETE_VEHICLE_SUCCESS, DELETE_VEHICLE_FAILED } from '../constants/actionTypes';

export default function vehicleDetailsReducer(state = {}, action) {

  switch (action.type) {
    case VEHICLEDETAILS_SUCCESSFUL:
      console.log("VDETSUCCESS");
      return {...state, vehicleDetails: action.data.value, requestState: {vehicleDetailsSuccess: true, vehicleDetailsPending: false, vehicleDetailsFailed: false, error: null} };
    case VEHICLEDETAILS_PENDING:
      console.log("VDETPEND");
      return {...state, requestState: {vehicleDetailsSuccess: false, vehicleDetailsPending: true, vehicleDetailsFailed: false, error: null} };
    case VEHICLEDETAILS_FAILURE: 
      console.log("VDETFAIL"); 
      return {...state, requestState: {vehicleDetailsSuccess: false, vehicleDetailsPending: false, vehicleDetailsFailed: true, error: action.error} };
    case DELETE_VEHICLE_REQUEST:
      return {...state, updating: true};
    case DELETE_VEHICLE_SUCCESS:
        return {...state, updateSuccess: true, updating: false, userInfo: {...action.userInfo}};
    case DELETE_VEHICLE_FAILED:
        return {...state, updateContactFailed: true, updating: false, userInfo: {...action.userInfo} }
    default:
      return state;
  }
}
