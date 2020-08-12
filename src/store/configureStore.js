import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


function configureStore(initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  return store;
}

export default configureStore;
