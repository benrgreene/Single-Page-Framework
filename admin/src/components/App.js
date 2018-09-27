const React = require('react')

// Child Components
import Login from './Login'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Connection functions to the component
const mapStateToProps = state => ({
  auth: state.authToken
})

class App extends React.Component {
  render() {
    if(this.props.auth) {
      return (
        <div>Logged In</div>  
      )
    } else {
      return (
        <Login/>
      )
    }
  }
}

export default connect(mapStateToProps, null)(App)