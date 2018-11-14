const React = require('react')

import { connect } from 'react-redux';
import DOMPurify from 'dompurify'

// ------------------------------------
// ------ REDUX STATE MANAGEMENT ------
// ------------------------------------
const mapStateToProps = state => ({
  archiveType: state.archiveType,
  postsPageOn: state.postsPageOn,
  loadedPosts: state.loadedPosts
})

const mapDispatcherToProps = dispatch => {
  return {
    // Currently selected post
    setPosts: (posts, pageOn) => dispatch({
      type: 'POSTS',
      loadedPosts: posts,
      postsPageOn: pageOn
    })
  }
}

// ------------------------------------
// --------- COMPONENT CLASS ----------
// ------------------------------------
class Archive extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadedPosts: [],
      lastID: false,
      moreAvailable: true,
    }
    // callbacks
    this.loadNextPage = this.loadNextPage.bind(this)
    // setup
    this.fetchPage()
  }

  // Make an API request to fetch the next page of the given post type
  fetchPage () {
    let self = this
    fetch(`${window.theme.baseURL}api/get/page/${this.props.archiveType}/${this.props.postsPageOn}`)
    .then((blob) => {
      return blob.json()
    })
    .then((response) => {
      if (response.content) {
        let posts = self.props.loadedPosts
        posts.push(... response.content)
        // Dispatch to redux AND set in state for auto re-rendering
        self.props.setPosts(posts, this.props.postsPageOn + 1)
        self.setState({ 
          'loadedPosts': posts,
          'moreAvailable': response.haveMore
        })
      }
    })
  }

  loadNextPage (event) {
    this.fetchPage()
  }

  render () {
    return (
      <div className="l-contain">
        <div className={'archive archive--' + this.props.archiveType}>
          {this.state.loadedPosts.map((post) => { return (
            <article key={post.title} className="post">
              <div className="post__title">{post.title}</div>
              <div className="post__content"
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content)}}></div>
            </article>
          )})}
        </div>
        {this.state.moreAvailable ? (
          <button onClick={this.loadNextPage}>Load More</button>
        ) : (
          <button disabled="disabled">No More Posts</button>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Archive)