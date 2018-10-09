const React = require('react')

import { getBaseURL } from '../helpers/info'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken,
  email: state.user,
  postTypes: state.postTypes,
  postObject: state.currentPost ? state.currentPost : {},
  posts: state.postsOfCurrentType
})

const mapDispatcherToProps = dispatch => {
  return {
    // Currently selected post
    setPost: (post) => dispatch({
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

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class AddPostForm extends React.Component {
  constructor (props) {
    super(props)
    // callbacks
    this.postPost     = this.postPost.bind(this)
    this.toggleIsNew  = this.toggleIsNew.bind(this)
    this.setType      = this.setType.bind(this)
    this.setTitle     = this.setTitle.bind(this)
    this.setContent   = this.setContent.bind(this)
    this.deletePost   = this.deletePost.bind(this)
    // set initial states
    this.state = { 
      isNew: false,
      type: '',
      title: '',
      content: ''
    }
  }
  
  toggleIsNew () {
    this.setState({
      isNew: !this.state.isNew
    })
  }
  
  // ---------------------------------------------
  // Callbacks for the inputs to set our post data
  // Need to set the props as well as state or the 
  // behavior gets a little screwy
  setContent (event) {
    this.props.postObject.content = event.target.value
    this.setState({
      'content': event.target.value
    })
  }

  setTitle (event) {
    this.props.postObject.title = event.target.value
    this.setState({
      'title': event.target.value
    })
  }

  setType (event) {
    this.props.postObject.type = event.target.value
    this.setState({
      'type': event.target.value
    })
  }

  // There's been an update in the redux state, 
  // update component props/state
  componentWillUpdate (nextProps, nextState) {
    if (nextProps.postObject.title != this.state.title) {
      console.log(nextProps);
      this.setTitle({ target: { value: nextProps.postObject.title } })
      this.setContent({ target: { value: nextProps.postObject.content } })
      this.setType({ target: { value: nextProps.postObject.type } })
    }
  }

  // Post to the admin API the new post object
  postPost () {
    let baseUrl  = getBaseURL()
    let postUrl  = baseUrl + 'api/post/'
    // info to pass
    const body   = {
      token: this.props.token,
      author: this.props.email,
      title: this.state.title,
      content: this.state.content,
      type: this.state.type ? this.state.type : 'post'
    }
    // Need to check if this is a new post, or if we are updating
    if (this.props.postObject.ID && 0 < this.props.postObject.ID) {
      body.postID = this.props.postObject.ID
      postUrl += 'editPost'
    }
    else {
      postUrl += 'newPost'
    }
    // make the POST request
    fetch(postUrl, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(body),
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
  }

  deletePost () {
    const self    = this
    const baseUrl = getBaseURL()
    const postUrl = baseUrl + 'api/delete/post'
    const body    = {
      token: this.props.token,
      id: this.props.postObject.ID ? this.props.postObject.ID : 0
    }
    fetch( postUrl, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(body)
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(self.props.postObject.ID)
      let newPosts = self.props.posts.filter((el) => {
        console.log(el.ID)
        return el.ID != self.props.postObject.ID
      })
      // remove the post from the list of all posts
      console.log(newPosts)
      self.props.setPosts(newPosts)
      // set current post to an empty post
      self.props.setPost({})
    })
  }

  render () {
    return (
      <div className="main-content">
      <div className="form form--new-post">
        <div>
          <label htmlFor="title">Title</label>
          <input name="title" onChange={this.setTitle} value={this.state.title || ''} />
        </div>
        <div>
          <label htmlFor="should-be-new">Create New Post Type?</label>
          <input name="should-be-new" type="checkbox" onChange={this.toggleIsNew}/>
        </div>
        {this.state.isNew ? (
          <div>
            <label htmlFor="new-name">New Post Type</label>
            <input name="new-name" type="input" onChange={this.setType} value={this.state.type} />
          </div>
        ) : (
          <div>
            <span className="label">Select Post Type</span>
            <select name="post-type" value={this.state.type} onChange={this.setType}>
              {this.props.postTypes.map((postType) => { return (
                <option key={postType} data-type={postType}>
                  {postType}
                </option>
              )})}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="name">Content</label>
          <textarea name="content" onChange={this.setContent} value={this.state.content || ''}></textarea>
        </div>
        <button onClick={this.postPost}>Submit Post</button>
        <button onClick={this.deletePost}>Delete Post</button>
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(AddPostForm)