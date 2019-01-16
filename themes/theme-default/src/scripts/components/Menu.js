const React = require('react')

import { connect } from 'react-redux'
import { fetchPostBySlug } from '../helpers-fetch.js'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapDispatcherToProps = dispatch => {
  return {
    setPostForSingle: (postObject, postType) => dispatch({
      type: 'POST_TO_VIEW',
      postObject: postObject,
      viewType: postType
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Menu extends React.Component {
  constructor (props) {
    super(props)
    // initial state
    this.state = {
      'menu': [],
      'isDisplayed': false
    }
    // callbacks
    this.openSubMenu      = this.openSubMenu.bind(this)
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    this.followLink       = this.followLink.bind(this)
  }

  componentDidMount () {
    // setup
    this.loadMenu()
  }

  /**
   * --------------------------------------------------------
   * General Setup
   * --------------------------------------------------------
   */
  loadMenu () {
    let self = this
    fetch(`${baseURL}api/get/menu`)
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
    let subMenuOpen = el.dataset.menuOpen
    if('false' == subMenuOpen) {
      el.innerHTML = '-'
    } else {
      el.innerHTML = '+'
    }
    el.dataset.menuOpen = ('true' == subMenuOpen) ? 'false' : 'true'
    el.parentNode.classList.toggle('sub-menu--open')
  }

  toggleMobileMenu (event) {
    document.body.classList.toggle('nav-open')
    let isDisplayed = !this.state.isDisplayed
    this.setState({ isDisplayed: isDisplayed })
  }

  followLink (event) {
    event.preventDefault();
    let link = event.target.getAttribute('href')
    if (!link.includes('http')) {
      let slug = link.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      let self = this
      fetchPostBySlug(link).then((data) => {
        self.props.setPostForSingle(data, data.type)
        this.toggleMobileMenu(event)
      })
    } else {
      window.open(link, '__blank')
    }
  }

  render () {
    return (
      <nav id="js-navigation" className="site-navigation">
        <button className="button menu-toggle"
                onClick={this.toggleMobileMenu}>
          {this.state.isDisplayed ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
        <ul className="menu">
          {this.state.menu.map((menuItem, index) => { return (
            <li key={index} >
              <a href={menuItem.link}
                 onClick={this.followLink}>{menuItem.name}</a>
              {menuItem.children.length > 0 &&
                <button data-menu-open="false" 
                    className="sub-menu__toggle button"
                    onClick={this.openSubMenu}>+</button>
              }
              {menuItem.children.length > 0 &&
                <ul className="sub-menu">
                  {menuItem.children.map((subMenuItem, subIndex) => { return (
                    <li key={'sub' + subIndex}><a href={subMenuItem.link} onClick={this.followLink}>{subMenuItem.name}</a></li>
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

export default connect(null, mapDispatcherToProps)(Menu)