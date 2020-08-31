import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import contactReducer from './contactReducer';
import appointmentReducer from './appointmentReducer';
import feeReducer from './feeReducer';
import informationReducer from './informationReducer'
import loginReducer from './loginReducer';
import paypalReducer from './paypalReducer';




const rootReducer = combineReducers({
  bookReducer,
  appointmentReducer,
  contactReducer,
  feeReducer,
  informationReducer,
  loginReducer,
  paypalReducer,
});






export default rootReducer;
