import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from '../constants/actionTypes';

let userInfo = JSON.parse(localStorage.getItem('token'));

const initialState = userInfo ? { loggedIn: true, userInfo } : {};

export default function loginReducer(state = initialState, action){
  switch (action.type){
      case LOGIN_REQUEST:
          return {...state, loggingIn: true};
      case LOGIN_SUCCESS:
          return {...state, loggedIn: true, userInfo: {...action.userInfo}};
      case LOGIN_FAILED:
          return {...state, loggedIn:false};
      case LOGOUT:
          return {};
      default:
          return state
  }
}
