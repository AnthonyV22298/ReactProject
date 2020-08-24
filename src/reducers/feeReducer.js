import { FEES_SUCCESFUL, FEES_PENDING, FEES_FAILURE } from '../constants/actionTypes';

export default function feeReducer(state = {}, action) {
  switch (action.type) {
    case FEES_SUCCESFUL:
      return {...state, fees: action.data.value, requestState: {feesSuccess: true, feesPending: false, feesFailed: false, error: null} };
    case FEES_PENDING:
      return {...state, requestState: {feesSuccess: false, feesPending: true, feesFailed: false, error: null} };
    case FEES_FAILURE:  
    return {...state, requestState: {feesSuccess: false, feesPending: false, feesFailed: true, error: action.error} };
    default:
      return state;
  }
}