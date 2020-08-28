import { FINDING_PAYMENT, PAYMENT_FOUND, PAYMENT_NOT_FOUND } from '../constants/actionTypes';

export default function paypalReducer(state = {}, action) {
  switch (action.type) {
    case PAYMENT_FOUND:
      return {...state, payment: action.data.value, requestState: {paymentFound: true, findingPayment: false, paymentNotFound: false, error: null} };
    case FINDING_PAYMENT:
      return {...state, requestState: {paymentFound: false, findingPayment: true, paymentNotFound: false, error: null} };
    case PAYMENT_NOT_FOUND:  
    return {...state, requestState: {paymentFound: false, findingPayment: false, paymentNotFound: false, error: action.error} };
    default:
      return state;
  }
}