import {LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_FAILED} from '../constants/actionTypes';

//gets the info from the local storage token
//let userInfo = JSON.parse(localStorage.getItem('token'));
//sets the inital user state to token information if it exists
//const initialState = userInfo ? { loggedIn: true, userInfo } : {};


let userInfo = JSON.parse(localStorage.getItem('userInfo'));
//sets the inital user state to token information if it exists
const initialState = userInfo ? { loggedIn: true, userInfo } : {};


export default function loginReducer(state = initialState, action){
  switch (action.type){
      case LOGIN_REQUEST:
          return {...state,
              loggingIn: true};
      case LOGIN_SUCCESS:
          return {...state,
              loggedIn: true,
              loggingIn: false,
              loginFailed:false,
              userInfo: {...action.userInfo}};
      case LOGIN_FAILED:
          return {...state,
              loginFailed:true,
              loggingIn: false};
      case LOGOUT:
          return {};
      case UPDATE_CONTACT_REQUEST:
          return {...state,
              updating: true};
      case UPDATE_CONTACT_SUCCESS:
          return {...state,
              updateSuccess: true,
              updating: false,
              userInfo: {...action.userInfo}};
      case UPDATE_CONTACT_FAILED:
          return {...state,
            updateContactFailed: true,
            updating: false,
            userInfo: {...action.userInfo} }
      default:
          return state
  }
}
