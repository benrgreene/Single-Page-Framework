export function getBaseURL () {
  return '/spa-framework/'
}

export function displayNotice (message, type="success") {
  const dialog            = document.querySelector('#js-dialog')
  const dialogContent     = document.querySelector('#js-dialog-content')
  dialogContent.innerHTML = message
  dialog.open = true
  dialog.setAttribute('class', type)
}