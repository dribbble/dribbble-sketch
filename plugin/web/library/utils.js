const _global = require('../../library/utils')
const serialize = require('../vendor/serialize')
const pluginCall = require('sketch-module-web-view/client')

/**
 * Send message to Sketch
 */
const sendMessage = function(action, values={}) {
  pluginCall('pluginMessage', { action, values })
}

/**
 * Receive message from Sketch
 */
let pluginActions = {}
const receiveMessage = function(stringifiedJSON) {
  const obj = JSON.parse(stringifiedJSON)
  const action = obj.action
  const values = obj.values

  if (action != null && pluginActions[action] != null) {
    pluginActions[action](values)
  }
}

/**
 * Check against our internal dimension requirements
 * to see if the selection dimensions are too small
 */
const selectionTooSmall = function(selection) {
  return (
    selection.frame.width < _global.config.dimensionReqs.width &&
    selection.frame.height < _global.config.dimensionReqs.height
  )
}

module.exports = Object.assign(_global, {
  sendMessage,
  pluginActions,
  receiveMessage,
  selectionTooSmall,
})
