const _global = require('../../library/utils')
const analytics = require('./analytics')
const serialize = require('../vendor/serialize')
const pluginCall = require('sketch-module-web-view/client')

// Load Segment
analytics.load()

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
    selection.frame.width < _global.config.dimensionReqs.min.width ||
    selection.frame.height < _global.config.dimensionReqs.min.height
  )
}

/**
 * Check against our internal dimension requirements
 * to see if the selection dimensions are too large
 */
const selectionTooLarge = function(selection) {
  return (
    selection.frame.width > _global.config.dimensionReqs.max.width ||
    selection.frame.height > _global.config.dimensionReqs.max.height
  )
}

/**
 * Check against our internal dimension requirements
 * to see if the selection dimensions are not the accepted ratio
 */
const selectionBadRatio = function(selection) {
  const allowedRatio = _global.config.dimensionReqs.min.width / _global.config.dimensionReqs.min.height
  const actualRatio = selection.frame.width / selection.frame.height
  return allowedRatio !== actualRatio
}

/**
 * Wrapper for Fetch that will retry X number of times
 * with Y delay in between retries before giving up
 */
const retriableFetch = (url, options={}, config={ retries: 5, delay: 3000 }) => {
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
        reject(error)
      }

      delayedRetry(resolve, reject)
    }).catch((error) => {
      if (config.retries === 1) {
        reject(error)
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

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

module.exports = Object.assign(
  _global,
  analytics, {
    serialize,
    sendMessage,
    pluginActions,
    receiveMessage,
    selectionTooSmall,
    selectionTooLarge,
    selectionBadRatio,
    retriableFetch,
    serializeObject,
    b64toBlob,
  }
)
