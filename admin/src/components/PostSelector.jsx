const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBaseURL } from '../helpers/info'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapDispatcherToProps = dispatch => {
  return {
    sendPost: (post) => dispatch({
      type: 'SETCURRENTPOST',
      post: post
    })
  }
}

const mapStateToProps = state => ({
  postTypes: state.postTypes
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class PostSelector extends React.Component {
  constructor (props) {
    super(props)
    // references
    this.postTypeRef
    // callbacks
    this.setPost = this.setPost.bind(this)
    this.setPostType = this.setPostType.bind(this)
    // other
    this.selectedPostType = 'post'
    // state
    this.state = { 'posts': [] }
    // setup
    this.getPostTypes()
  }

  // Set the post type to display
  setPostType () {
    this.selectedPostType = this.postTypeRef.value
    this.getPostTypes()
  }

  getPostTypes () {
    let baseUrl = getBaseURL()
    let self    = this
    fetch(baseUrl + 'api/get/posts/' + this.selectedPostType, {
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    .then((blob) => {
      return blob.json()
    })
    .then((data) => {
      self.setState({
        'posts': data.content
      })
    })
  }

  // Select the current post to edit
  setPost (event) {
    let postData = {
      'id': event.target.dataset.id,
      'type': event.target.dataset.type,
      'content': event.target.dataset.content,
      'title': event.target.dataset.title,
    }
    this.props.sendPost(postData)
  }

  render() {
    return (
      <aside className="left-side">
        <div className="post-select">
          <select className="post-type" 
            ref={(input) => this.postTypeRef = input}
            onChange={this.setPostType} >
            {this.props.postTypes.map((postType) => <option value={postType} key={postType}>{postType}</option>)}
          </select>
        </div>
        <div className="all-posts">
          {this.state.posts.map((post) => {
            return (
              <div key={post.ID} data-id={post.ID} 
                data-content={post.content} data-type={post.type} 
                data-title={post.title}
                onClick={this.setPost}>
                {post.title}
              </div>
            )
          })}
        </div>
      </aside>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(PostSelector)