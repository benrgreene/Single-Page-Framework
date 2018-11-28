const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sidebar from './Sidebar'

import { fetchFeatureImage } from '../helpers-fetch.js'

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
      image: false
    }
    document.title = `${siteTitle} - ${this.props.postObject.title}`
    // callbacks
    this.backToArchive = this.backToArchive.bind(this)
    // Let's set the query param for sharing purposes
    var newurl = siteUrl + '?post=' + this.props.postObject.slug;
    window.history.pushState({ path: newurl }, '', newurl)
  }

  backToArchive (event) {
    this.props.setPageType('archive')
  }

  componentDidMount () {
    let self = this
    fetchFeatureImage(this.state.postObject.ID).then((response) => {
      self.setState({
        'image': response[0].path + response[0].name
      })
    })
  }

  render () {
    return(
      <div className="l-contain">
        <div className="back-button" onClick={this.backToArchive}>Back To Blog</div>
        <div className="post-wrapper">
          <article className="post post--single">
            { this.state.image && 
              <figure className="post__feature-image">
                <img src={this.state.image} />
              </figure>
            }
            <h1 className="post__title">{this.state.postObject.title}</h1>
            <div className="post__info">
              <div className="post__author">Written By: {this.state.postObject.author}</div>
            </div>
            <div className="post__content"
                 dangerouslySetInnerHTML={{ __html: this.state.postObject.content}}></div>
          </article>
          <Sidebar/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Single)