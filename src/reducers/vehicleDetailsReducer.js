import { VEHICLEDETAILS_SUCCESSFUL, VEHICLEDETAILS_PENDING, VEHICLEDETAILS_FAILURE } from '../constants/actionTypes';

export default function vehicleDetailsReducer(state = {}, action) {
  /*
  if (typeof this.vehicleDetails === 'undefined'){
    return null 
  }
  */

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
    default:
      return state;
  }
}
