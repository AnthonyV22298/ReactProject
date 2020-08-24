import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import contactReducer from './contactReducer';
import appointmentReducer from './appointmentReducer';
import feeReducer from './feeReducer';
import informationReducer from './informationReducer'
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  bookReducer,
  appointmentReducer,
  contactReducer,
  feeReducer,
  informationReducer,
  loginReducer,
});

export default rootReducer;
