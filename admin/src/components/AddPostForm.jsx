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
  postObject: state.currentPost ? state.currentPost : {}
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class AddPostForm extends React.Component {
  constructor(props) {
    super(props)
    // callbacks
    this.postPost     = this.postPost.bind(this)
    this.toggleIsNew  = this.toggleIsNew.bind(this)
    this.setType      = this.setType.bind(this)
    this.setTitle     = this.setTitle.bind(this)
    this.setContent   = this.setContent.bind(this)
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
      this.setTitle({ target: { value: nextProps.postObject.title } })
    }
    if (nextProps.postObject.content != this.state.content) {
      this.setContent({ target: { value: nextProps.postObject.content } })
    }
    if (nextProps.postObject.type != this.state.type) {
      this.setType({ target: { value: nextProps.postObject.type } })
    }
  }

  // Post to the admin API the new post object
  postPost() {
    let baseUrl  = getBaseURL()
    let postUrl  = baseUrl + 'api/post/'
    // info to pass
    const body   = {
      token: this.props.token,
      author: this.props.email,
      title: this.state.title,
      content: this.state.content,
      type: this.state.isNew ? this.newTypeRef : this.typeRef.dataset.type
    }
    if (0 != this.props.postID) {
      body.postID = this.props.postID
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

  render() {
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
          <textarea name="content" onChange={this.setContent} value={this.state.content}></textarea>
        </div>
        <button onClick={this.postPost}>Submit Post</button>
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(AddPostForm)