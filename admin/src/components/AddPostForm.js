const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken,
  email: state.user
  postTypes: state.postTypes
})

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class AddPostForm extends React.Component {
  constructor(props) {
    super(props)
    // callbacks
    this.postPost = this.postPost.bind(this)
    // input references
    this.typeRef
    this.contentRef 
  }

  // Should post to the admin API 
  postPost() {
    let token    = this.props.token
    let email    = this.props.email
    let postType = this.typeRef.value
    let content  = this.contentRef.value
    let baseUrl  = getBaseURL()
  }

  render() {
    return (
      <div className="form form--new-post">
        <div>
          <label htmlFor="name">New Post Type</label>
          <input name="post-type" type="input" ref={(input) => this.typeRef = input} />
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