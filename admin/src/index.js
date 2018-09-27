// Base imports
const React    = require('react')
const ReactDom = require('react-dom')

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer.js'
// Components
import Login from './components/Login'
import App from './components/App'

const store = createStore(reducer, {
  authToken: false
});

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);