const React    = require('react')
const ReactDom = require('react-dom')

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer.js'

import App from './components/App'

const store = createStore(reducer, {
  archiveType: 'post',
  postsPageOn: 1,
  loadedPosts: []
})

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);