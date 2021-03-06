// ensure that the filters object exists
if (!window.brgAdminFilters) {
  window.brgAdminFilters = {}
}

// Register callbacks
const registerCallback = (action, callback, options={}) => {
  // ensure that there is an array of callbacks for the action
  if (!window.brgAdminFilters[action]) {
    window.brgAdminFilters[action] = []
  }
  window.brgAdminFilters[action].push({
    'callback': callback,
    'options': options
  })
}

const getCallbacks = (action) => {
  return window.brgAdminFilters[action]
}