
import axios from 'axios'

import { READ_BOOKS_SUCCESFUL, READ_BOOKS_FAILURE, READ_BOOKS_PENDING} from '../constants/actionTypes';

export const readBooks = () => {
  return dispatch => {
      dispatch(_readBookStarted());

      return axios.get(`https://run.mocky.io/v3/1be8720d-9099-4054-a0a3-717de3563992`)
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