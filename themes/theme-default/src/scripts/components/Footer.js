const React = require('react')

import { connect } from 'react-redux';
import DOMPurify from 'dompurify'

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
class Footer extends React.Component {
  constructor (props) {
    super(props)
    // callbacks
    this.displayWidget = this.displayWidget.bind(this)
    // set state
    this.state = {
      'footer_widget_one': false,
      'footer_widget_two': false,
      'footer_widget_three': false,
      'numberLoadedWidgets': 0
    }
  }

  componentDidMount () {
    // Fetch our widgets
    this.getWidget('footer_widget_one')
    this.getWidget('footer_widget_two')
    this.getWidget('footer_widget_three')
  }

  getWidget (name) {
    let self = this
    fetch(`${baseURL}api/get/themeOption/${name}`)
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      if (response.content && '' != response.content.value) {
        let newState = {
          'numberLoadedWidgets': self.state.numberLoadedWidgets + 1
        }
        newState[name] = response.content
        self.setState(newState)
        self.setupWidgetLinks()
      }
    })
  }

  setupWidgetLinks () {
    let links = document.querySelectorAll('.widget a')
    links.forEach((link, index) => {
      let href = link.getAttribute('href')
      link.addEventListener('click', (event) => {
        event.preventDefault()
        let href = event.target.getAttribute('href')
        if (!href.includes('http')) {
          let slug = href.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
          let self = this
          fetchPostBySlug(href).then((data) => {
            self.props.setPostForSingle(data, data.type)
          })
        } else {
          window.open(href, '__blank')
        }
      })
    })
  }

  displayWidget (name) {
    if (this.state[name]) {
      return (
        <div className="widget" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state[name]['value'] )}}></div>
      )
    }
  }

  render () {
    return (
      <footer className="site-footer">
        <div className={'footer-widgets footer-widgets--' + this.state.numberLoadedWidgets + ' l-contain'}>
          {this.displayWidget('footer_widget_one')}
          {this.displayWidget('footer_widget_two')}
          {this.displayWidget('footer_widget_three')}
        </div>
        <div className="site-info">
          <div className="l-contain">
            ©{(new Date()).getFullYear()} | Site design by Ben Greene
          </div>
        </div>
      </footer>
    )
  }
}

export default connect(null, mapDispatcherToProps)(Footer)