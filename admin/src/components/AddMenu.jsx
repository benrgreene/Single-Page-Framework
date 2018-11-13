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
class MenuForm extends React.Component {
  constructor (props) {
    super(props)
    // callbacks
    this.saveMenu   = this.saveMenu.bind(this)
    this.addNewItem = this.addNewItem.bind(this)
    this.addSubItem = this.addSubItem.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateLink = this.updateLink.bind(this)
    // state
    this.state = { 
      menu: []
    }
    // get the menu for populating the form
    this.getMenu()
  }

  // ------------------------------------
  // ------------- CALBACKS -------------
  // ------------------------------------
  addNewItem (event) {
    let menu = this.state.menu
    menu.push({
      'name': '',
      'link': '',
      'children': []
    })
    this.setState({'menu': menu})
  }

  addSubItem (event) {
    let menu  = this.state.menu
    // index of the parent menu item in the menu array
    let index = event.target.dataset.parent
    menu[index].children.push({
      'name': '',
      'link': ''
    })
    this.setState({'menu': menu})
  }

  updateName (event) {
    this.updateValue(event, 'name')
  }

  updateLink (event) {
    this.updateValue(event, 'link')
  }

  updateValue (event, type) {
    let menu   = this.state.menu
    let index  = event.target.parentNode.parentNode.dataset.index
    let parent = event.target.parentNode.parentNode.dataset.parent || false
    if (parent) {
      menu[parent].children[index][type] = event.target.value
    } else {
      menu[index][type] = event.target.value
    }
    this.setState({'menu': menu})
  }

  // ------------------------------------
  // ---------- API FUNCTIONS -----------
  // ------------------------------------
  getMenu() {
    let self    = this
    let baseUrl = getBaseURL()
    fetch(baseUrl + "api/get/menu", {
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => { 
      let menu = JSON.parse(data.content.value)
      if (menu) {
        this.setState({'menu': menu})
      }
    })
  }

  saveMenu() {
    let self    = this
    let baseUrl = getBaseURL()
    let body    = {
      'token': this.props.token,
      'menu': this.state.menu
    }
    fetch(baseUrl + "api/save/menu", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(body),
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      console.log(blob)
    })
  }

  render() {
    return (
      <div>
        {this.state.menu.map((menuItem, index) => { return (
          <div key={index} data-index={index} className="form">
            <div> 
              <label>Name</label>
              <input className="name" 
                      value={menuItem.name}
                      onChange={this.updateName} />
            </div>
            <div>
              <label>Link</label>
              <input className="link" 
                      value={menuItem.link} 
                      onChange={this.updateLink} />
            </div>
            <div className="children">
              {menuItem.children.map((subItem, subIndex) => { return (
                <div key={'sub' + subIndex} data-index={subIndex} data-parent={index} className="form">
                  <div> 
                    <label>Name</label>
                    <input className="name" 
                      value={subItem.name}
                      onChange={this.updateName} />
                  </div>
                  <div>
                    <label>Link</label>
                    <input className="link" 
                            value={subItem.link} 
                            onChange={this.updateLink} />
                  </div>
                </div>
              )})}
              <button onClick={this.addSubItem} data-parent={index}>+ Menu Sub Item</button>
            </div>
          </div>
        )})}
        <button onClick={this.addNewItem}>+ Menu Item</button>
        <div className="save-menu">
          <button onClick={this.saveMenu}>Save Menu</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(MenuForm)