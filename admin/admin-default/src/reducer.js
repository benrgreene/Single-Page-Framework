export function reducer (state, action) {
  switch (action.type) { 
    case 'LOGIN':
      return Object.assign({}, state, {
        authToken: action.token,
        user: action.user
      })
    case 'SAVEPOSTTYPES':
      return Object.assign({}, state, {
        postTypes: action.postTypes
      })
    case 'SETCURRENTPOST':
      return Object.assign({}, state, {
        currentPost: action.post
      })
    case 'SETCURRENTPOSTS':
      return Object.assign({}, state, {
        postsOfCurrentType: action.posts
      })
    default: 
      return state
  }
}