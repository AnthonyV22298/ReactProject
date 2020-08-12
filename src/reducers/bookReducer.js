import { READ_BOOKS_SUCCESFUL, READ_BOOKS_PENDING, READ_BOOKS_FAILURE } from '../constants/actionTypes';

export default function bookReducer(state = {}, action) {
  switch (action.type) {
    case READ_BOOKS_SUCCESFUL:
      return {...state, bookData: { books: action.data, requestSucessful: true } };
    case READ_BOOKS_PENDING:
      return {...state, bookData: {requestPending: true } };
    case READ_BOOKS_FAILURE:  
      return {...state, bookData: { requestFailed: true } };
    default:
      return state;
  }
}
