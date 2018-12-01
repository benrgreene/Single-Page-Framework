// Base imports
const React    = require('react')
const ReactDom = require('react-dom')
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer.js'
// Components
import Login from './components/Login'
import App from './components/App'

let savedTokenInfo = JSON.parse(sessionStorage.getItem('adminToken'))
let savedToken     = false
let now            = Date.now() / 1000
let user           = false
if (savedTokenInfo && savedTokenInfo.expiration > now) {
  savedToken = savedTokenInfo.token,
  user       = savedTokenInfo.user
}

const store = createStore(reducer, {
  authToken: savedToken,
  user: user,
  postTypes: [],
  postsOfCurrentType: []
});

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);