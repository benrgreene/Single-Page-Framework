const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class ThemeSelect extends React.Component {
  constructor (props) {
    super(props)
    // initial state
    this.state = { 
      selectableThemes: [],
      selectedTheme: false
    }
    // callbacks
    this.setSelectedTheme = this.setSelectedTheme.bind(this)
    this.saveTheme        = this.saveTheme.bind(this)
  }

  componentDidMount () {
    let self    = this
    let baseUrl = baseURL
    fetch(baseUrl + "api/get/themeDirectories", {
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      self.setState({ 
        selectableThemes: data.content.themes,
        selectedTheme: data.content.selectedTheme
      })
    })
  }

  setSelectedTheme (event) {
    let selectedIndex = this.selectedTheme.selectedIndex
    let selected      = this.state.selectableThemes[selectedIndex]
    this.setState({
      selectedTheme: selected
    })
  }

  saveTheme (event) {
    let self    = this
    let baseUrl = baseURL
    let body    = {
      token: this.props.token,
      selectedTheme: this.state.selectedTheme
    }
    fetch(baseUrl + "api/post/saveTheme", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(body)
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      console.log(data)
    })
  }

  render () {
    return (
      <div className="form form--theme-select">
        <div>
          <label>Set Site Theme</label>
          <select 
            name="site-theme"
            ref={(input) => this.selectedTheme = input}
            onChange={this.setSelectedTheme}
            value={this.state.selectedTheme} >
            {this.state.selectableThemes.map((theme, index) => { return(
              <option key={theme} 
                      data-index={index} 
                      name={theme}>{theme}</option>
            )})}
          </select>
        </div>
        <button onClick={this.saveTheme}>Save Theme Selection</button>
      </div>
    )
  }
}
 
export default connect(mapStateToProps, null)(ThemeSelect)