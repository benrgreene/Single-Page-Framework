export function reducer (state, action) {
  switch (action.type) { 
    case 'LOGIN':
      return Object.assign({}, state, {
        authToken: action.payload
      })
    default: 
      return state
  }
}