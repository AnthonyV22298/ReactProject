import { CONTACTS_SUCCESFUL, CONTACTS_PENDING, CONTACTS_FAILURE } from '../constants/actionTypes';

export default function contactReducer(state = {}, action) {
  switch (action.type) {
    case CONTACTS_SUCCESFUL:
      return {...state, contacts: action.data.value, requestState: {contactsSuccess: true, contactsPending: false, contactsFailed: false, error: null} };
    case CONTACTS_PENDING:
      return {...state, requestState: {contactsSuccess: false, contactsPending: true, contactsFailed: false, error: null} };
    case CONTACTS_FAILURE:  
    return {...state, requestState: {contactsSuccess: false, contactsPending: false, contactsFailed: true, error: action.error} };
    default:
      return state;
  }
}
