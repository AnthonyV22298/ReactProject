
import axios from 'axios'

import { READ_BOOKS_SUCCESFUL, READ_BOOKS_FAILURE, READ_BOOKS_PENDING} from '../constants/actionTypes';

export const readBooks = () => {
  return dispatch => {
      dispatch(_readBookStarted());

      return axios.get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
      .then(res => {
          dispatch(_readBookSuccess(res));
      })
      .catch( (error) => {
          console.log(error);
          dispatch(_readBookFailed(error));
      });


  };
}

const _readBookSuccess = (res) => {
    return {
        type: READ_BOOKS_SUCCESFUL,
        data:  res.data
    };
}

const _readBookFailed = (error) => {
    return {
        type: READ_BOOKS_FAILURE,
        error  
    };
}

const _readBookStarted = () => {
    return {
        type: READ_BOOKS_PENDING
    };
}