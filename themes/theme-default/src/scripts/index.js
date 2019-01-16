const React    = require('react')
const ReactDom = require('react-dom')
const Dialogr  = require('dialogr');

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer.js'

import App from './components/App'

const store = createStore(reducer, {
  archiveType: 'post',
  postsPageOn: 1,
  loadedPosts: [],
  viewType: 'archive',
  postObject: false,
  moreAvailable: true,
})

Dialogr.setup()

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);