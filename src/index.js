import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import reducers from './reducers';

const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducers, middleware)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
