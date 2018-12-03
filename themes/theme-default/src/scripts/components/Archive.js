const React = require('react')

import { connect } from 'react-redux';
import DOMPurify from 'dompurify'

import { md5 } from '../helpers.js'

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
    // Breakpoint info for the masonry tiles
    this.columnBreakpoints = [
      {'width': 500, 'columns': 2},
      {'width': 800, 'columns': 3}
    ]
    this.state = {
      // Allows us to track posts that have been loaded if the user 
      // was on the archive screen before
      loadedPosts: this.props.loadedPosts || [],
      moreAvailable: true,
      columns: this.resizeTiles()
    }
    this.archiveRef
    this.spaceAround = 20
    // Let's set the query param for sharing purposes
    window.history.pushState({ path: siteUrl }, '', siteUrl)
    document.title = `${siteTitle} - Post Archive`
    // callbacks
    this.loadNextPage  = this.loadNextPage.bind(this)
    this.setPostToView = this.setPostToView.bind(this)
  }

  componentDidMount () {
    // prevent archive loading another page of posts when it is 
    // brought back into the view IF it has post to display already
    if (0 == this.state.loadedPosts.length) {
      this.fetchPage()  
    }

    // on window resize, we need to reset the masonry tiles
    window.addEventListener("resize", () => {
      let columns = this.resizeTiles()
      this.positionTiles(columns)
    })
    
    let columns = this.resizeTiles()
    this.positionTiles(columns)
  }

  // Resize all the tiles for the masonry
  resizeTiles () {
    let docWidth  = document.body.clientWidth
    let numCols   = 1
    let lastWidth = 0
    this.columnBreakpoints.forEach((breakpoint) => {
      if (breakpoint.width >= lastWidth && breakpoint.width < docWidth) {
        numCols   = breakpoint.columns
        lastWidth = breakpoint.width
      }
    })
    return numCols
  }

  // Set masonry tile positisons
  positionTiles (columns) {
    let columnPos = []
    for (let i = 0; i < columns; i++) {
      columnPos.push(0)
    }
    // This is our base size for columns
    let baseWidth = this.archiveRef.clientWidth / columns
    let tiles = document.querySelectorAll('.tile')
    // Now, we start positioning tiles. 
    tiles.forEach((tile, index) => {
      let tileHeight = Math.min(...columnPos)
      let tileColumn = columnPos.indexOf(tileHeight)
      // update the column positioning array
      columnPos[tileColumn] += this.spaceAround + tile.clientHeight
      // Set tile positioning
      tile.style.top = (tileHeight + this.spaceAround) + 'px'
      tile.style.left = (baseWidth * tileColumn) + 'px'
    })
    // Set the height of the masonry section
    this.archiveRef.style.height = (Math.max(...columnPos) + this.spaceAround) + 'px'
    this.setState({'columns': columns})
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
        // reset the masonry
        let columns = this.resizeTiles()
        this.positionTiles(columns)
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
        <div id="archive" 
             className={'archive archive--' + this.props.archiveType + ' masonry masonry--' + this.state.columns}
             ref={comp => this.archiveRef = comp} >
          {this.state.loadedPosts.map((post, index) => { return (
            <article key={post.title} className="post tile" data-index={index} onClick={(event) => {this.setPostToView(index)}}>
              <h3 className="post__title">{post.title}</h3>
              <div className="post__info">
                {post.email && 
                  <figure className="post__feature-image">
                    <img src={`http://www.gravatar.com/avatar/${md5(post.author)}.jpg`} alt="feature image"/>
                  </figure>
                }
                <div className="post__author">
                  {post.name}
                </div>
              </div>
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