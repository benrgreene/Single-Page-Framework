const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBaseURL } from '../helpers/info'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapDispatcherToProps = dispatch => {
  return {
    // Currently selected post
    sendPost: (post) => dispatch({
      type: 'SETCURRENTPOST',
      post: post
    }),
    // All posts of selected post type
    setPosts: (posts) => dispatch({
      type: 'SETCURRENTPOSTS',
      posts: posts
    })
  }
}

const mapStateToProps = state => ({
  postTypes: state.postTypes,
  posts: state.postsOfCurrentType,
  postObject: state.currentPost ? state.currentPost : {},
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
    // setup
    this.getPostsOfType()
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.postObject.ID != nextProps.postObject.ID) {
      this.setState({
        'postObject': nextProps.postObject
      })
    }
  }

  // Set the post type to display
  setPostType () {
    this.selectedPostType = this.postTypeRef.value
    this.getPostsOfType()
  }

  getPostsOfType () {
    let baseUrl = baseURL
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
      this.props.setPosts(data.content)
    })
  }

  // Select the current post to edit
  setPost (event) {
    let postData = {
      'ID': event.target.dataset.id,
      'type': event.target.dataset.type,
      'content': event.target.dataset.content,
      'excerpt': event.target.dataset.excerpt,
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
          <div key="0" data-id="0" onClick={this.setPost}>+ Create New Post</div>
          {this.props.posts.map((post) => {
            return (
              <div key={post.ID} 
                  data-id={post.ID}
                  data-excerpt={post.excerpt}
                  data-content={post.content}
                  data-type={post.type}
                  data-title={post.title}
                  className={this.props.postObject.ID == post.ID ? 'selected-post' : ''}
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