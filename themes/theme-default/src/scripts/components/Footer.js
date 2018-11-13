const React = require('react')

import { connect } from 'react-redux';

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
    // Fetch our widgets
    this.getWidget('footer_widget_one')
    this.getWidget('footer_widget_two')
    this.getWidget('footer_widget_three')
  }

  getWidget (name) {
    let self = this
    fetch(`${window.theme.baseURL}api/get/themeOption/${name}`)
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
      }
    })
  }

  displayWidget (name) {
    if (this.state[name]) {
      return (
        <div className="widget" dangerouslySetInnerHTML={{ __html: this.state[name]['value'] }}></div>
      )
    }
  }

  render () {
    return (
      <div className={'footer-widgets footer-widgets--' + this.state.numberLoadedWidgets}>
        {this.displayWidget('footer_widget_one')}
        {this.displayWidget('footer_widget_two')}
        {this.displayWidget('footer_widget_three')}
      </div>
    )
  }
}

export default connect(null, null)(Footer)