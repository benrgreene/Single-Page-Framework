const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBaseURL } from '../helpers/info'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapDispatcherToProps = dispatch => {
  return {
    sendLogin: ( token, email ) => dispatch({
      type: 'LOGIN',
      token: token,
      user: email
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
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
      let saveTokenData = JSON.stringify({
        token: token,
        expiration: data.expiration
      })
      this.props.sendLogin(token, email)
      // Save to the session storage for potential reload
      sessionStorage.setItem('adminToken', saveTokenData);
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