const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sidebar from './Sidebar'

import { fetchFeatureImage } from '../helpers-fetch.js'
import { md5 } from '../helpers.js'

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
      gravitar: false
    }
    document.title = `${siteTitle} - ${this.props.postObject.title}`
    // callbacks
    this.backToArchive = this.backToArchive.bind(this)// Let's set the query param for sharing purposes
    var newurl = siteUrl + '?post=' + this.props.postObject.slug;
    window.history.pushState({ path: newurl }, '', newurl)
  }

  backToArchive (event) {
    this.props.setPageType('archive')
  }

  componentDidMount () {
    // get the feature image
    let self = this
    fetchFeatureImage(this.state.postObject.ID).then((response) => {
      self.setState({
        'image': response[0].path + response[0].name
      })
    })

    if (this.state.postObject.author) {
      this.setState({
        gravitar: `http://www.gravatar.com/avatar/${md5(this.state.postObject.author)}.jpg`
      })
    }
  }

  render () {
    return(
      <div className="l-contain">
        <div className="back-button" onClick={this.backToArchive}>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
          Back To Blog
        </div>
        <div className="post-wrapper">
          <article className="post post--single">
            {this.state.image && 
              <figure className="post__feature-image">
                <img src={this.state.image} alt="feature image"/>
              </figure>
            }
            <h2 className="post__title">{this.state.postObject.title}</h2>
            <div className="post__info">
              <div className="post__author">
                {this.state.gravitar && 
                  <figure className="post__author-image">
                    <img src={this.state.gravitar} alt="author gravitar" />
                  </figure>
                }
                Written By: {this.state.postObject.author}
              </div>
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