const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Child Components
import Login from './Login'
import AddPostForm from './AddPostForm'
import PostSelector from './PostSelector'
import MenuForm from './AddMenu'

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
  constructor (props) {
    super(props)
    this.state = { 
      displayPane: 'posts'
    }
  }

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
        <div className="site-wrapper">
          <ul className="selectors">
            <li onClick={(event) => {this.setState({'displayPane': 'posts'})}}>Post Form</li>
            <li onClick={(event) => {this.setState({'displayPane': 'menu'})}}>Menu Form</li>
          </ul>
          {this.state.displayPane === 'posts' &&
            <div className="wrapper">
              <PostSelector/>
              <AddPostForm/>
            </div>
          }
          {this.state.displayPane === 'menu' &&
            <div className="wrapper">
              <MenuForm/>
            </div>
          }
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