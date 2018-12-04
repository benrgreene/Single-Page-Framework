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
      gravitar: `http://www.gravatar.com/avatar/${md5(this.props.postObject.author)}.jpg?d=identicon`
    }
    // callbacks
    this.backToArchive = this.backToArchive.bind(this)// Let's set the query param for sharing purposes
    // set window info
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

  // Now that the component is mounted, fetch the feature image
  componentDidMount () {
    this.setFeature()
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
               dangerouslySetInnerHTML={{ __html: this.state.postObject.content}}></div>
            <Sidebar/>
          </div>
        </article>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Single)