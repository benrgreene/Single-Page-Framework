const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBaseURL } from '../helpers/info'

// Connection functions to the component
const mapDispatcherToProps = dispatch => {
  return {
    sendLogin: ( token ) => dispatch({
      type: 'LOGIN',
      payload: token
    })
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.attemptLogin = this.attemptLogin.bind(this)
    this.userRef
    this.passRef
  }

  // make the POST to the auth endpoint to attempt the login. 
  // If successfull, we'll update the state with the auth token we get back
  attemptLogin() {
    let baseUrl  = getBaseURL()
    let email    = this.userRef.value
    let password = this.passRef.value
    let myself   = this
    fetch( baseUrl + "api/login", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'email': email,
        'password': password
      })
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      let token = data.content;
      this.props.sendLogin(token)
    })    
  }
  
  render() {
    return (
      <div className="form form--login">
        <div>
          <label htmlFor="name">email</label>
          <input name="email" type="email" ref={(input) => this.userRef = input} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input name="password" type="password" ref={(input) => this.passRef = input} />
        </div>
        <button onClick={() => this.attemptLogin()}>Login</button>
      </div>
    )
  }
}

export default connect(null, mapDispatcherToProps)(Login)