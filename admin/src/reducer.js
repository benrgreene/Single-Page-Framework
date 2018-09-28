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
    default: 
      return state
  }
}