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

const retriableFetch = (url, options={}, config={ retries: 5, delay: 2000 }) => {
  const delayedRetry = function(resolve, reject) {
    setTimeout(() => {
      config.retries = config.retries - 1
      retriableFetch(url, options, config)
        .then(resolve)
        .catch(reject)
    }, config.delay)
  }

  return new Promise((resolve, reject) => {
    fetch(url, options).then((response) => {
      if (response.ok) {
        return resolve(response)
      } else if (config.retries === 1) {
        throw error
      }

      delayedRetry(resolve, reject)
    }).catch((error) => {
      if (config.retries === 1) {
        throw error
      }

      delayedRetry(resolve, reject)
    })
  })
}

/**
 * Serialize an object (one level deep) in to URL params
 */
const serializeObject = function(obj) {
  return Object.keys(obj).map((key) => {
    return `${key}=${encodeURIComponent(obj[key])}`
  }).join('&')
}

module.exports = Object.assign(_global, {
  sendMessage,
  pluginActions,
  receiveMessage,
  selectionTooSmall,
  retriableFetch,
  serializeObject,
})
