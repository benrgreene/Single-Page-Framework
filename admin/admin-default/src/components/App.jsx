const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Child Components
import AddPostForm from './AddPostForm'
import Importer from './Importer'
import Login from './Login'
import MenuForm from './AddMenu'
import OptionsForm from './OptionsForm'
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
  constructor (props) {
    super(props)
    this.state = {
      displayPane: 'posts',
      extraPanes: []
    }
  }

  componentDidMount() {
    this.setState({
      extraPanes: getCallbacks('adminPane')
    })
    let self    = this
    let baseUrl = baseURL
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

    if (this.props.auth) {
      let event = new Event('AdminLogin')
      document.dispatchEvent(event)
    }
  }

  componentDidUpdate () {
    if (!isNaN(parseFloat(this.state.displayPane))) {
      let id = `extra-panel-${this.state.displayPane}`
      this.state.extraPanes[this.state.displayPane].callback(id)
    }
  }

  render() {
    if (this.props.auth) {
      return (
        <div className="site-wrapper">
          <dialog id="js-dialog">
            <h2>Notice:</h2>
            <div id="js-dialog-content"></div>
          </dialog>
          <ul className="selectors">
            <li onClick={(event) => {this.setState({'displayPane': 'posts'})}}>Post Form</li>
            <li onClick={(event) => {this.setState({'displayPane': 'menu'})}}>Menu Form</li>
            <li onClick={(event) => {this.setState({'displayPane': 'options'})}}>Theme Options</li>
            <li onClick={(event) => {this.setState({'displayPane': 'importer'})}}>Importer</li>
            {this.state.extraPanes.map((pane, index) => { return (
              <li key={index} onClick={(event) => {this.setState({'displayPane': index})}}>{pane.options.panelTitle}</li>
            )})}
            <li><a href={baseURL} target="_blank"><i className="fas fa-external-link-alt"></i></a></li>
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
          {this.state.displayPane === 'options' &&
            <div className="wrapper">
              <OptionsForm/>
            </div>
          }
          {this.state.displayPane === 'importer' &&
            <div className="wrapper">
              <Importer/>
            </div>
          }
          {!isNaN(parseFloat(this.state.displayPane)) &&
            <div id={`extra-panel-${this.state.displayPane}`}></div>
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