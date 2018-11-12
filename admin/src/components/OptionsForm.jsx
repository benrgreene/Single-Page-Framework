const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill'; 

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class OptionsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      'options': [],
      'selectedOption': {
        'index': 0,
        'name': '',
        'value': ''
      }
    }
    // refs
    this.optionSelectRef
    // callbacks
    this.setSelectedOption = this.setSelectedOption.bind(this)
    this.setOptionName     = this.setOptionName.bind(this)
    this.setOptionValue    = this.setOptionValue.bind(this)
    this.saveOptions       = this.saveOptions.bind(this)
    // setup
    this.getOptions()
  }

  // Fetches for getting site state
  getOptions () {
    let self    = this
    let baseUrl = getBaseURL()
    fetch(baseUrl + "api/get/themeOptions", {
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      self.setState({ 'options': data.content })
    })
  }

  // Save new option data
  saveOptions () {
    let self    = this
    let baseUrl = getBaseURL()
    let body    = {
      token: this.props.token,
      option: this.state.selectedOption
    }
    fetch(baseUrl + "api/post/themeOptions", {
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
      // If the post saved was a new post, we'll add it to
      // the list of posts displayed in the selectable list
      if (self.state.selectedOption.ID == 0) {
        let allOptions = self.state.options
        let newOption  = self.state.selectedOption
        newOption.ID   = data.ID
        allOptions.push(newOption)
        self.setState({ 'options': allOptions })
        self.setState({ 'selectedOption': newOption })
      }
    })
  }

  // Calbacks
  setSelectedOption (event) {
    let selectedIndex  = this.optionSelectRef.selectedIndex
    let selectedOption = {
      'index': 0,
      'name': '',
      'value': ''
    }
    if (0 < selectedIndex) {
      let selected   = this.optionSelectRef.options[selectedIndex];
      selectedOption = this.state.options[selected.dataset.index]  
    }
    this.setState({ 'selectedOption': selectedOption })
  }

  setOptionName (event) {
    this.setOption(event, 'name', event.target.value)
  }
  setOptionValue (event) {
    this.setOption(event, 'value', event)
  }
  setOption (event, option, value) {
    let selectedOption     = this.state.selectedOption
    selectedOption[option] = value
    this.setState({ 'selectedOption': selectedOption })
  }

  //rendering the options
  render () {
    return (
      <div>
        <select 
          ref={(input) => this.optionSelectRef = input}
          onChange={this.setSelectedOption}
          value={this.state.selectedOption.name} >
          <option name="new" data-index="0">+ Option</option>
          {this.state.options.map((option, index) => { return(
            <option key={option.name} 
                    data-index={index} 
                    name={option.name}>{option.name}</option>
          )})}
        </select>
        <div className="form">
          <div>
            <label htmlFor="name">Option Name</label>
            <input name="name" 
                   type="text"
                   onChange={this.setOptionName}
                   value={this.state.selectedOption.name} />
          </div>
          <div>
            <label htmlFor="value">Option Value</label>
            <ReactQuill name="value" 
                        onChange={this.setOptionValue} 
                        value={this.state.selectedOption.value} />
          </div>
          <button onClick={this.saveOptions}>Save Option</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(OptionsForm)