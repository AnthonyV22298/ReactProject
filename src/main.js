import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

import configureStore from './store/configureStore';

import {App} from './components/App.js';

const store = configureStore();

ReactDom.render((
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('app'));
  