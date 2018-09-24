// Base imports
const React    = require('react')
const ReactDom = require('react-dom')

import { createStore } from 'redux'
import { reducer } from './reducer.js'
// Components
import Login from './components/Login'

const store = createStore(reducer);

ReactDom.render(
  <Login />,
  document.getElementById('app')
);