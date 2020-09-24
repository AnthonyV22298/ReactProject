import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import contactReducer from './contactReducer';
import appointmentReducer from './appointmentReducer';
import feeReducer from './feeReducer';
import informationReducer from './informationReducer';
import loginReducer from './loginReducer';
import paypalReducer from './paypalReducer';
import insuranceReducer from './insuranceReducer';
import modalReducer from './modalReducer';
import vehicleDetailsReducer from './vehicleDetailsReducer';
import infoDMVReducer from './infoDMVReducer';

const rootReducer = combineReducers({
  bookReducer,
  appointmentReducer,
  contactReducer,
  feeReducer,
  informationReducer,
  loginReducer,
  paypalReducer,
  insuranceReducer,
  modalReducer,
  vehicleDetailsReducer,
  infoDMVReducer,
});

export default rootReducer;