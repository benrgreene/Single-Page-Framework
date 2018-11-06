const React = require('react')

import { connect } from 'react-redux';

class Menu extends React.Component {
  constructor(props) {
    super(props)
    // initial state
    this.state = {
      'menu': []
    }
    // setup
    this.loadMenu()
  }

  loadMenu() {
    let self = this
    fetch(`${window.theme.baseURL}api/get/menu`)
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      let menu = JSON.parse(response.content.value)
      console.log(menu)
      self.setState({'menu': menu})
    })
  }

  render() {
    return (
      <nav id="js-navigation" className="site-navigation">
        <ul className="menu">
          {this.state.menu.map((menuItem, index) => { return (
            <li key={index} >
              <a href={menuItem.link}>{menuItem.name}</a>
              {menuItem.children.length > 0 &&
                <ul className="sub-menu">
                  {menuItem.children.map((subMenuItem, subIndex) => { return (
                    <li key={'sub' + subIndex}>
                      <a href={subMenuItem.link}>{subMenuItem.name}</a>
                    </li>
                  )})}
                </ul>
              }
            </li>
          )})}
        </ul>
      </nav>
    )
  }
}

export default connect(null, null)(Menu)