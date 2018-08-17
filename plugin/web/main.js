import * as React from 'react'
import * as ReactDOM from 'react-dom'

const _ = require('./library/utils')
const style = require('./style.scss')

const ErrorModal = require('./components/error/ErrorModal.jsx')
const LoginModal = require('./components/login/LoginModal.jsx')
const ShareModal = require('./components/share/ShareModal.jsx')

// const settings = await _.settings.access()
// const authToken = settings.get('authToken')
// const loggedIn = authToken != null
const loggedIn = false

let Component, props = {}

if (!navigator.onLine) {
  Component = ErrorModal
  props = { type: 'notConnected' }
} else if (!loggedIn) {
  Component = LoginModal
}

// else if (!selectedNode) {
//   Component = ErrorModal
//   props = { type: 'noSelection' }
// } else if (selection.length > 1) {
//   Component = ErrorModal
//   props = { type: 'multipleSelection' }
// } else if (_.nodeNotAllowed(selectedNode)) {
//   Component = ErrorModal
//   props = { type: 'badNodeType', node: selectedNode }
// } else if (_.nodeTooSmall(selectedNode)) {
//   Component = ErrorModal
//   props = { type: 'tooSmall', node: selectedNode }
// }

else {
  Component = ShareModal
  props = { node: selectedNode }
}

ReactDOM.render(
  React.createElement(Component, props, null),
  document.getElementById('app')
)
