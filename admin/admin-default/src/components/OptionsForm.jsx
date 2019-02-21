const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ThemeSelect from './ThemeSelect'

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
      'confirmDelete': false,
      'optionType': 'wysiwyg',
      'options': [],
      'selectedOption': {
        'index': 0,
        'name': '',
        'value': ''
      }
    }
    // refs
    this.optionSelectRef
    this.valueTypeRef
    // callbacks
    this.setSelectedOption     = this.setSelectedOption.bind(this)
    this.setOptionName         = this.setOptionName.bind(this)
    this.setOptionValue        = this.setOptionValue.bind(this)
    this.setWYSIWYGOptionValue = this.setWYSIWYGOptionValue.bind(this)
    this.saveOptions           = this.saveOptions.bind(this)
    this.deleteOption          = this.deleteOption.bind(this)
    this.confirmDelete         = this.confirmDelete.bind(this)
    this.setOptionValueType    = this.setOptionValueType.bind(this)
    // setup
    this.getOptions()
  }

  // Fetches for getting site state
  getOptions () {
    let self    = this
    let baseUrl = baseURL
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
    let baseUrl = baseURL
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

  // --------------------
  // Calbacks
  // --------------------

  // Option selected in the dropdown, so display it in the form fields
  setSelectedOption (event) {
    let selectedIndex  = this.optionSelectRef.selectedIndex
    let selectedOption = {
      'index': 0,
      'name': '',
      'value': ''
    }
    if (0 < selectedIndex) {
      let selected   = this.optionSelectRef.options[selectedIndex]
      selectedOption = this.state.options[selected.dataset.index]
    }
    this.setState({ 
      'selectedOption': selectedOption,
      'confirmDelete': false
    })
  }

  // Update the name/value fields with the newly entered values
  setOptionName (event) {
    this.setOption(event, 'name', event.target.value)
  }
  setOptionValue (event) {
    this.setOption(event, 'value', event.target.value)
  }
  setWYSIWYGOptionValue (event) {
    this.setOption(event, 'value', event)
  }
  setOption (event, option, value) {
    let selectedOption     = this.state.selectedOption
    selectedOption[option] = value
    this.setState({ 'selectedOption': selectedOption })
  }

  // Switch delete button to the confirm delete button
  confirmDelete (event) {
    this.setState({
      'confirmDelete': true
    })
  }

  // switch the type of input used for the option value
  setOptionValueType (event) {
    let selectedIndex = this.valueTypeRef.selectedIndex
    let selected      = this.valueTypeRef.options[selectedIndex]
    this.setState({
      'optionType': selected.value
    })
  }

  // Actually delete the option
  deleteOption (event) {
    const self    = this
    const baseUrl = baseURL
    const postUrl = baseUrl + 'api/delete/themeOption'
    const body    = {
      token: this.props.token,
      id: this.state.selectedOption.ID ? this.state.selectedOption.ID : 0
    }
    fetch( postUrl, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(body)
    })
    .then((response) => {
      if (200 == response.status) {
        return response.json()  
      }
      else {
        return false
      }
    })
    .then((data) => {
      // Remove from the displayed array of options
      if (data) {
        let oldSelection   = this.state.selectedOption.name
        let newOptions     = this.state.options
        newOptions = newOptions.filter((option) => {
          return option.name != oldSelection
        })
        self.setState({
          'options': newOptions,
          'selectedOption': {
            'index': 0,
            'name': '',
            'value': ''
          },
          'confirmDelete': false
        })
      }
    })
  }

  // --------------------
  // Rendering
  // --------------------
  render () {
    return (
      <div className="options-wrapper">
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
          <div className="form form--options">
            <div>
              <label htmlFor="name">Option Name</label>
              <input name="name" 
                     type="text"
                     onChange={this.setOptionName}
                     value={this.state.selectedOption.name} />
            </div>
            <div>
              <label>Option Input Type</label>
              <select ref={(input) => this.valueTypeRef = input}
                      onChange={this.setOptionValueType}
                      value={this.state.optionType} >
                <option value="wysiwyg" key="wysiwyg">WYSIWYG Editor</option>
                <option value="text" key="text">Text Input</option>
              </select>
            </div>
            {'wysiwyg' == this.state.optionType ? (
              <div>
                <label htmlFor="value">Option Value</label>
                <ReactQuill name="value" 
                            onChange={this.setWYSIWYGOptionValue} 
                            value={this.state.selectedOption.value} />
              </div>  
            ) : (
              <div>
                <label htmlFor="value">Option Value</label>
                <textarea
                  name="value" 
                  onChange={this.setOptionValue} 
                  value={this.state.selectedOption.value} />
              </div>
            )}
            <button onClick={this.saveOptions}>Save Option</button>
            {this.state.confirmDelete ? (
              <button className="button button__delete" onClick={this.deleteOption}>Are you sure?</button>
            ) : (
              <button className="button button__delete" onClick={this.confirmDelete}>Delete Option</button>
            )}
          </div>
        </div>
        <ThemeSelect/>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(OptionsForm)