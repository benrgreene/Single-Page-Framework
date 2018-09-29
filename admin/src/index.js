// Base imports
const React    = require('react')
const ReactDom = require('react-dom')
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer.js'
// Components
import Login from './components/Login'
import App from './components/App'

let savedToken = sessionStorage.getItem('adminToken')

const store = createStore(reducer, {
  authToken: savedToken,
  user: false,
  postTypes: []
});

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);