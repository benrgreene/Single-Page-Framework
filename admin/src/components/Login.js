const React = require('react')

import { getBaseURL } from '../helpers/info'

export default class Login extends React.Component {
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
      console.log(data)
    })    
  }
  
  render() {
    return (
      <div className="login form">
        <input type="email" ref={(input) => this.userRef = input} />
        <input type="password" ref={(input) => this.passRef = input} />
        <button onClick={() => this.attemptLogin()}>Login</button>
      </div>
    )
  }
}