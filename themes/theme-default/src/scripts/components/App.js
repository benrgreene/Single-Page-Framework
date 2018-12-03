const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Archive from './Archive'
import Footer from './Footer'
import Menu from './Menu'
import Page from './Page'
import Single from './Single'

import { fetchPostBySlug } from '../helpers-fetch.js'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  viewType: state.viewType,
  postObject: state.postObject
})

const mapDispatcherToProps = dispatch => {
  return {
    viewPostType: (postObject, postType) => dispatch({
      type: 'POST_TO_VIEW',
      postObject: postObject,
      viewType: postType
    }),
    viewArchive: () => dispatch({
      type: 'ARCHIVE_VIEW',
      viewType: 'archive'
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      viewType: this.props.viewType
    }

    this.goToArchive = this.goToArchive.bind(this)
  }

  /**
   *  Need to check page defaults and set state accordingly
   */
  componentDidMount () {
    let self = this
    if (pageDefaults.post) {
      fetchPostBySlug(pageDefaults.post).then((postObject) => {
        self.props.viewPostType(postObject, 'single')
      })
    } 
    else if (pageDefaults.page) {
      fetchPostBySlug(pageDefaults.page).then((postObject) => {
        self.props.viewPostType(postObject, 'page')
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.viewType != nextProps.viewType && this.state) {
      this.setState({ viewType: nextProps.viewType })
    }
  }

  goToArchive (event) {
    event.preventDefault()
    if ('archive' != this.state.viewType) {
      this.props.viewArchive()  
    }
  }

  render () {
    return(
      <div className="app-body">
        <header className="site-header">
          <div className="site-header__content l-contain">
            <div className="site-title">
              <a href={siteUrl} onClick={this.goToArchive}>Title</a>
            </div>
            <Menu/>
          </div>
        </header>
        <section id="js-content" className="site-content">
          {'archive' == this.state.viewType && 
            <Archive/>
          }
          {'single' == this.state.viewType && 
            <Single/>
          }
          {'page' == this.state.viewType && 
            <Page/>
          }
        </section>
        <Footer/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App)