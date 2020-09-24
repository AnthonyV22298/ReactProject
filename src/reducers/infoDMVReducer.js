import { INFODMV_SUCCESSFUL, INFODMV_FAILURE, INFODMV_PENDING} from '../constants/actionTypes';

export default function infoDMVReducer(state = {}, action) {

  switch (action.type) {
    case INFODMV_SUCCESSFUL:
      return {...state, infoDMV: action.data.value, requestState: {infoDMVSuccess: true, infoDMVPending: false, infoDMVFailed: false, error: null} };
    case INFODMV_PENDING:
      return {...state, requestState: {infoDMVSuccess: false, infoDMVPending: true, infoDMVFailed: false, error: null} };
    case INFODMV_FAILURE: 
      return {...state, requestState: {infoDMVSuccess: false, infoDMVPending: false, infoDMVFailed: true, error: action.error} };
    default:
      return state;
  }
}
