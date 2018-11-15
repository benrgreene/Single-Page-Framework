/**
 * DIFFERENT REDUX STATE VARIABLES:
 *
 *  - archiveType: current post type archive
 *  - loadedPosts: the posts (of type 'post') already loaded
 *  - postsPageOn: the page of posts to be loaded next
 *  - viewType:    what kind of view (archive, single, etc) is currently displayes
 */

export function reducer (state, action) {
  switch (action.type) { 
    case 'ARCHIVE_TYPE':
      return Object.assign({}, state, {
        archiveType: action.archiveType
      })
    case 'POSTS':
      return Object.assign({}, state, {
        loadedPosts: action.loadedPosts,
        postsPageOn: action.postsPageOn
      })
    case 'POST_TO_VIEW':
      return Object.assign({}, state, {
        postObject: action.postObject,
        viewType: action.viewType
      })
    case 'ARCHIVE_VIEW':
      return Object.assign({}, state, {
        viewType: action.viewType
      })
    default:
      return state
  }
}