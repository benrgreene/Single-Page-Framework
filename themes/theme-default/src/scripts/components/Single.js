const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sidebar from './Sidebar'

import { fetchFeatureImage } from '../helpers-fetch.js'
import { md5, setWindowTitle } from '../helpers.js'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  postObject: state.postObject
})

const mapDispatcherToProps = dispatch => {
  return {
    setPageType: (pageType) => dispatch({
      type: 'ARCHIVE_VIEW',
      viewType: pageType,
      postObject: false
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Single extends React.Component {
  constructor (props) {
    super(props)
    // state
    this.state = {
      postObject: this.props.postObject,
      image: false,
      loadedGist: false,
      gravitar: `http://www.gravatar.com/avatar/${md5(this.props.postObject.author)}.jpg?d=identicon`
    }
    // callbacks
    this.backToArchive     = this.backToArchive.bind(this)
    this.processShortcodes = this.processShortcodes.bind(this)
    // Let's set the query param for sharing purposes
    setWindowTitle(this.props.postObject)
  }

  backToArchive (event) {
    this.props.setPageType('archive')
  }

  setFeature () {
    let self = this
    fetchFeatureImage(this.state.postObject.ID).then((response) => {
      if (response) {
        self.setState({
          'image': response[0].path + response[0].name
        })
      }
    })
  }

  // Proccess all shortcodes
  processShortcodes (content) {
    content = window.theme.processShortcode(content, 'gist', this.processGists)
    return content
  }

  // need to load a gist into the page
  processGists (settings) {
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = settings.src + '.json?file=' + settings.file + '&callback=gistCallback';
    document.head.appendChild(script);
    return `<div id="${settings.file.replace('.js', '')}"></div>`
  }

  // Now that the component is mounted, fetch the feature image
  componentDidMount () {
    this.setFeature()
    let self = this
    // add our callback for what a gist is loaded
    window['gistCallback'] = (gist) => {
      let div = document.querySelector(`#${gist.files[0].replace('.js', '')}`)
      div.innerHTML = gist.div
      if (!self.state.loadedGist) {
        self.setState({'loadedGist': true})
        let newStyle  = document.createElement('link')
        newStyle.href = gist.stylesheet
        newStyle.type = "text/css";
        newStyle.rel  = "stylesheet";
        document.head.appendChild(newStyle)
      }
    }
  }

  // Make sure the window state, postObject, and feature 
  // image are up to date with the new post object
  componentWillReceiveProps (nextProps) {
    if (!this.state) { return }
    if (this.props.postObject != nextProps.postObject) {
      setWindowTitle(nextProps.postObject)
      this.setState({'postObject': nextProps.postObject})
      this.setFeature()
    }
  }

  render () {
    return(
      <div className="l-contain">
        {this.state.image && 
          <figure className="feature-image--single">
            <img src={('string' == typeof this.state.image) ? this.state.image : undefined} alt="feature image"/>
          </figure>
        }
        <div className="back-button" onClick={this.backToArchive}>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
          Back To Blog
        </div>
        <article className="post post--single">
          <h1 className="post__title">{this.state.postObject.title}</h1>
          <div className="post__author">
            <figure className="post__author-image">
              <img src={this.state.gravitar} alt="author gravitar" />
              <figcaption className="post__author--name">
                Written By: {this.state.postObject.author}
              </figcaption>
            </figure>
          </div>
          <div className="post-wrapper">
            <div className="post__content"
               dangerouslySetInnerHTML={{ __html: this.processShortcodes(this.state.postObject.content)}}></div>
            <Sidebar/>
          </div>
        </article>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Single)