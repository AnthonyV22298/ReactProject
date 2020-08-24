import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import contactReducer from './contactReducer';
import informationReducer from './informationReducer';

const rootReducer = combineReducers({
  bookReducer,
  contactReducer,
  informationReducer,
});

export default rootReducer;
