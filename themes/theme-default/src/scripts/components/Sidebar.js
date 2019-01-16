const React   = require('react')

import { connect } from 'react-redux';

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    // initial state
    this.state = {
      'sidebarContent': '' 
    }
  }

  componentDidMount () {
    this.fetchSidebar()
  }

  fetchSidebar () {
    let self = this
    fetch(`${baseURL}api/get/themeOption/theme_sidebar`)
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      self.setState({ 'sidebarContent': response.content.value })
    })
  }

  render () {
    return (
      <aside className="sidebar">
        <div className="sidebar__content" 
             dangerouslySetInnerHTML={{ __html: this.state.sidebarContent}}></div>
      </aside>
    )
  }
}

export default connect(null, null)(Sidebar)