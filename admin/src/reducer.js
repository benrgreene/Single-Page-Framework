export function reducer (state, action) {
  switch (action.type) { 
    case 'LOGIN':
      return Object.assign({}, state, {
        auth: action.payload
      })
    default: 
      return state
  }
}