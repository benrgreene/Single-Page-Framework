const React = require('react')

import { getBaseURL } from '../helpers/info'
import { postFetch, tieMediaToPost } from '../helpers/fetches'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill'; 

import PostMetaForm from './PostMeta'

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
    // refs
    this.fileRef
    // callbacks
    this.postPost      = this.postPost.bind(this)
    this.toggleIsNew   = this.toggleIsNew.bind(this)
    this.deletePost    = this.deletePost.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    // set initial states
    this.state = { 
      isNew: false,
      type: this.props.postObject.type || '',
      title: this.props.postObject.title || '',
      excerpt: this.props.postObject.excerpt || '',
      content: this.props.postObject.content || '',
      confirmDelete: false,
      newImage: true,
      contentType: 'WYSIWYG'
    }
  }
  
  toggleIsNew () {
    this.setState({
      isNew: !this.state.isNew
    })
  }

  // There's been an update in the redux state, 
  // update component state
  componentWillUpdate (nextProps, nextState) {
    if (this.props.postObject.ID != nextProps.postObject.ID) {
      this.setState({
        'type': nextProps.postObject.type,
        'title': nextProps.postObject.title,
        'content': nextProps.postObject.content,
        'excerpt': nextProps.postObject.excerpt,
        'confirmDelete': false
      })
    }
  }

  // Post to the admin API the new post object
  postPost () {
    let self = this
    // Save the post
    let baseUrl  = baseURL
    let postUrl  = baseUrl + 'api/post/'
    // info to pass
    const body   = {
      token: this.props.token,
      author: this.props.email,
      title: this.state.title,
      content: this.state.content,
      excerpt: this.state.excerpt,
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
      // ensure we have the new postID for saving post meta/upload
      if (!self.props.postObject.ID || self.props.postObject.ID == 0) {
        self.props.postObject.ID = data.ID
      }
      // Let the meta form know to post the new post meta
      self.metaRef.getWrappedInstance().sendPostMeta(self.props.postObject.ID)
      // upload the post media
      self.postUpload()
    })
  }

  postUpload () {
    let self     = this
    let formData = new FormData()
    formData.append('file', this.fileRef.files[0])
    formData.append('token', this.props.token)
    fetch(baseURL + 'api/post/uploadMedia', {
      'method': 'POST',
      'body': formData
    })
    .then((blob) => {
      return blob.json()  
    })
    .then((data) => {
      if (data.mediaID) {
        tieMediaToPost(data.mediaID, self.props.postObject.ID, this.props.token)
      }
    })
  }

  // Allow for double checking the admin really does want to delete the post
  confirmDelete () {
    this.setState({
      'confirmDelete': true
    })
  }

  deletePost () {
    const self    = this
    const baseUrl = baseURL
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
      let newPosts = self.props.posts.filter((el) => {
        return el.ID != self.props.postObject.ID
      })
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
            <input name="title" 
                   type="text"
                   onChange={(event) => {this.setState({'title': event.target.value})}} 
                   value={this.state.title || ''} />
          </div>
          <div>
            <label htmlFor="should-be-new">Create New Post Type?</label>
            <input  name="should-be-new" 
                    type="checkbox" 
                    onChange={this.toggleIsNew}/>
          </div>
          {this.state.isNew ? (
            <div>
              <label htmlFor="new-name">New Post Type</label>
              <input  name="new-name" 
                      type="text" 
                      onChange={(event) => {this.setState({'type': event.target.value})}} 
                      value={this.state.type} />
            </div>
          ) : (
            <div>
              <span className="label">Select Post Type</span>
              <select name="post-type"
                      value={this.state.type} 
                      onChange={(event) => {this.setState({'type': event.target.value})}}>
                {this.props.postTypes.map((postType) => { return (
                  <option key={postType} data-type={postType}>
                    {postType}
                  </option>
                )})}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="name">Content Type</label>
            <select name="post-content-type"
                    onChange={(event) => {this.setState({'contentType': event.target.value})}}>
              <option>WYSIWYG</option>
              <option>Text Editor</option>
            </select>
          </div>
          <div>
            <label htmlFor="excerpt">Excerpt</label>
            <div>
                <textarea name="excerpt"
                        className="excerpt-size-text"
                        onChange={(event) => {this.setState({'excerpt': event.target.value})}} 
                        value={this.state.excerpt || ''} />
              </div> 
          </div>
          {'WYSIWYG' == this.state.contentType ? (
            <div>
              <label htmlFor="content">Content</label>
              <ReactQuill name="content" 
                        onChange={(value) => {this.setState({'content': value})}} 
                        value={this.state.content || ''} />
            </div>
          ) : (
            <div>
              <label htmlFor="content">Content</label>
              <div>
                <textarea name="content"
                        className="full-size-text"
                        onChange={(event) => {this.setState({'content': event.target.value})}} 
                        value={this.state.content || ''} />
              </div>                        
            </div>
          ) }
          <PostMetaForm ref={comp => this.metaRef = comp} />
          <div className="post-images">
            {this.state.newImage ? (
              <div className="new-image">
                <input type="file" 
                       accept="image/png, image/jpeg"
                       ref={(input) => this.fileRef = input}
                       onChange={(event) => {console.log(this.fileRef.files[0])}} />
              </div>
            ) : (
              <div>
                existing image
              </div>
            )}
          </div>
          <button onClick={this.postPost}>Submit Post</button>
          {this.state.confirmDelete ? (
            <button className="button button__delete" onClick={this.deletePost}>Are you sure?</button>
          ) : (
            <button className="button button__delete" onClick={this.confirmDelete}>Delete Post</button>
          )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps, null, { withRef: true })(AddPostForm)