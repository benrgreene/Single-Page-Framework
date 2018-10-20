const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Child Components
import Login from './Login'
import AddPostForm from './AddPostForm'
import PostSelector from './PostSelector'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapDispatcherToProps = dispatch => {
  return {
    savePostTypes: ( postTypes ) => dispatch({
      type: 'SAVEPOSTTYPES',
      postTypes: postTypes
    })
  }
}

const mapStateToProps = state => ({
  auth: state.authToken,
  postTypes: state.postTypes
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class App extends React.Component {

  componentDidMount() {
    let self    = this
    let baseUrl = getBaseURL()
    fetch(baseUrl + "api/get/postTypes", {
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      self.props.savePostTypes(data.content)
    })
  }

  render() {
    if(this.props.auth) {
      return (
        <div className="wrapper">
          <PostSelector/>
          <AddPostForm/>
        </div>
      )
    } else {
      return (
        <Login/>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App)