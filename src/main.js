import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

import configureStore from './store/configureStore';

import {App} from './components/App.js';
import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig';
import { saveState, loadState } from './actions/authTokenConfig.js'


const store = configureStore();

store.subscribe(() => {
    loadState();
    saveState({
        userInfo: store.getState().loginReducer.userInfo
    });
});


const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {

  ReactDom.render((
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('app'));

}, DO_NOT_LOGIN);
