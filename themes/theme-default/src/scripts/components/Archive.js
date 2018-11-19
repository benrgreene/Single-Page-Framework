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
    }),
    setPostForSingle: (postObject) => dispatch({
      type: 'POST_TO_VIEW',
      postObject: postObject,
      viewType: 'single'
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
      // Allows us to track posts that have been loaded if the user 
      // was on the archive screen before
      loadedPosts: this.props.loadedPosts || [],
      moreAvailable: true,
    }
    document.title = `${siteTitle} - Post Archive`
    // callbacks
    this.loadNextPage  = this.loadNextPage.bind(this)
    this.setPostToView = this.setPostToView.bind(this)
    // Let's set the query param for sharing purposes
    window.history.pushState({ path: siteUrl }, '', siteUrl)
  }

  componentDidMount () {
    // prevent archive loading another page of posts when it is 
    // brought back into the view IF it has post to display already
    if (0 == this.state.loadedPosts.length) {
      this.fetchPage()  
    }
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

  setPostToView (index) {
    if (false !== index) {
      this.props.setPostForSingle(this.state.loadedPosts[index])
    }
  }

  render () {
    return (
      <div className="l-contain">
        <div className={'archive archive--' + this.props.archiveType}>
          {this.state.loadedPosts.map((post, index) => { return (
            <article key={post.title} className="post" data-index={index} onClick={(event) => {this.setPostToView(index)}}>
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