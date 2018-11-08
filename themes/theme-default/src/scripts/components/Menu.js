const React = require('react')

import { connect } from 'react-redux';

class Menu extends React.Component {
  constructor (props) {
    super(props)
    // initial state
    this.state = {
      'menu': [],
      'isDisplayed': false
    }
    // setup
    this.loadMenu()
    // callbacks
    this.openSubMenu = this.openSubMenu.bind(this)
  }

  /**
   * --------------------------------------------------------
   * General Setup
   * --------------------------------------------------------
   */
  loadMenu () {
    let self = this
    fetch(`${window.theme.baseURL}api/get/menu`)
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      let menu = JSON.parse(response.content.value)
      self.setState({'menu': menu})
    })
  }

  /**
   * --------------------------------------------------------
   * Callbacks for the mobile menu
   * --------------------------------------------------------
   */
  openSubMenu (event) {
    let el = event.target
    let subMenuOpen = el.dataset.menuOpen;
    if('false' == subMenuOpen) {
      el.innerHTML = '-';
    } else {
      el.innerHTML = '+';
    }
    el.dataset.menuOpen = ('true' == subMenuOpen) ? 'false' : 'true';
    el.parentNode.classList.toggle('sub-menu--open');
  }

  render () {
    return (
      <nav id="js-navigation" className="site-navigation">
        <ul className="menu">
          <button className="button menu-toggle">Toggle</button>
          {this.state.menu.map((menuItem, index) => { return (
            <li key={index} >
              <a href={menuItem.link}>{menuItem.name}</a>
              {menuItem.children.length > 0 &&
                <button data-menu-open="false" 
                    className="sub-menu__toggle button"
                    onClick={this.openSubMenu}>+</button>
              }
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