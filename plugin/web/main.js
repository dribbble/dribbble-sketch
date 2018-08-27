const React = require('react')
const ReactDOM = require('react-dom')
const _ = require('./library/utils')
const style = require('./style.scss')

window.receiveMessage = _.receiveMessage

const ErrorModal = require('./components/error/ErrorModal.jsx')
const LoginModal = require('./components/login/LoginModal.jsx')
const ShareModal = require('./components/share/ShareModal.jsx')

// const settings = await _.settings.access()
// const authToken = settings.get('authToken')
// const loggedIn = authToken != null
const loggedIn = true

_.pluginActions.receiveSelection = function(selection) {
  let Component, props = {}

  if (!navigator.onLine) {
    Component = ErrorModal
    props = { type: 'notConnected' }
  } else if (!loggedIn) {
    Component = LoginModal
  } else if (selection.length === 0) {
    Component = ErrorModal
    props = { type: 'noSelection' }
  } else if (selection.length > 1) {
     Component = ErrorModal
     props = { type: 'multipleSelection' }
  } else if (_.selectionTooSmall(selection.component)) {
    Component = ErrorModal
    props = { type: 'tooSmall', selection: selection.component }
  } else {
    Component = ShareModal
    props = { selection: selection.component }
  }

  ReactDOM.render(
    React.createElement(Component, props, null),
    document.getElementById('app')
  )

  window.pluginLoaded = true
}

_.sendMessage('requestSelection')
