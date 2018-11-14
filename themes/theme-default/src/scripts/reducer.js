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
    default:
      return state
  }
}