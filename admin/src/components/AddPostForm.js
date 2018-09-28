const React = require('react')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  token: state.authToken,
  email: state.user,
  postTypes: state.postTypes
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
    // other
    this.state = { isNew: false }
  }

  toggleIsNew() {
    this.setState({
      isNew: !this.state.isNew
    })
  }

  // Should post to the admin API 
  postPost() {
    let token    = this.props.token
    let email    = this.props.email
    let content  = this.contentRef.value
    let baseUrl  = getBaseURL()
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
          <select name="post-type" ref={(input) => this.typeRef = input}>
            {this.props.postTypes.map((postType) => <option value={postType} key={postType}>{postType}</option>)}
          </select>
        )}
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