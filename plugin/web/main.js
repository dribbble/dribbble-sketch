const React = require('react')
const ReactDOM = require('react-dom')
const _ = require('./library/utils')
const style = require('./style.scss')

window.receiveMessage = _.receiveMessage

const ErrorModal = require('./components/error/ErrorModal.jsx')
const LoginModal = require('./components/login/LoginModal.jsx')
const ShareModal = require('./components/share/ShareModal.jsx')

_.pluginActions.receiveContext = function(context) {
  const authToken = context.authToken
  const userDetails = context.userDetails
  let Component, props = {}

  if (!navigator.onLine) {
    Component = ErrorModal
    props = { type: 'notConnected' }
  } else if (!authToken || !authToken.length) {
    Component = LoginModal
  } else if (context.selectionSize === 0) {
    Component = ErrorModal
    props = { type: 'noSelection' }
  } else if (context.selectionSize > 1) {
     Component = ErrorModal
     props = { type: 'multipleSelection' }
  } else if (_.notExactSize(context.selection)) {
    Component = ErrorModal
    props = { type: 'badSize', selection: context.selection }
  } else {
    Component = ShareModal
    props = { selection: context.selection, user: userDetails, auth: authToken }
  }

  ReactDOM.render(
    React.createElement(Component, props, null),
    document.getElementById('app')
  )

  window.pluginLoaded = true
}

_.sendMessage('requestContext')
