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
  postTypes: state.postTypes
  postID: state.currentPostID ? state.currentPostID : 0
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class AddPostForm extends React.Component {
  constructor(props) {
    super(props)
    // callbacks
    this.postPost    = this.postPost.bind(this)
    this.toggleIsNew = this.toggleIsNew.bind(this)
    // input references
    this.newTypeRef
    this.typeRef
    this.contentRef 
    this.shouldBeNew
    this.titleRef
    // other
    this.state = { isNew: false }
  }

  toggleIsNew() {
    this.setState({
      isNew: !this.state.isNew
    })
  }

  // Post to the admin API the new post object
  postPost() {
    let baseUrl  = getBaseURL()
    let postUrl  = baseUrl + 'api/post/'
    // info to pass
    const body   = {
      token: this.props.token,
      author: this.props.email,
      title: this.titleRef.value,
      content: this.contentRef.value,
      type: this.state.isNew ? this.newTypeRef : this.typeRef.value
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
      <div className="form form--new-post">
        <div>
          <label htmlFor="should-be-new">Create New Post Type?</label>
          <input name="should-be-new" type="checkbox" 
            ref={(input) => this.shouldBeNew = input} onChange={this.toggleIsNew}/>
        </div>
        {this.state.isNew ? (
          <div>
            <label htmlFor="new-name">New Post Type</label>
            <input name="new-name" type="input" ref={(input) => this.newTypeRef = input} />
          </div>
        ) : (
          <div>
            <span>Select Post Type</span>
            <select name="post-type" ref={(input) => this.typeRef = input}>
              {this.props.postTypes.map((postType) => <option value={postType} key={postType}>{postType}</option>)}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="title">Title</label>
          <input name="title" ref={(input) => this.titleRef = input} />
        </div>
        <div>
          <label htmlFor="name">Content</label>
          <textarea name="content" ref={(input) => this.contentRef = input}></textarea>
        </div>
        <button onClick={() => this.postPost()}>Submit Post</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(AddPostForm)