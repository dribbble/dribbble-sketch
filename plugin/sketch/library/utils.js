const _global = require('../../library/utils')
const { isWebviewPresent, sendToWebview } = require('sketch-module-web-view/remote')
const sketch = require('sketch/dom')
const Settings = require('sketch/settings')

/**
 * Send message to Web View
 */
const sendMessage = function(action, values={}) {
  const id = _global.config.browserIdentifier
  const obj = { action: action, values: values }

  if (isWebviewPresent(id)) {
    sendToWebview(id, `receiveMessage('${JSON.stringify(obj)}')`)
  }
}

/**
 * Receive message from Web View
 */
let pluginActions = {
  saveAuthToken({ token }) {
    Settings.setSettingForKey('auth-token', token)
  },
  openURL({ url }) {
    openURL(url)
  }
}

const receiveMessage = function(obj) {
  const action = obj.action
  const values = obj.values

  if (action != null && pluginActions[action] != null) {
    pluginActions[action](values)
  }
}

/**
 * Open a URL in default browser
 */
const openURL = function(url) {
  const nsurl = NSURL.URLWithString(url)
  NSWorkspace.sharedWorkspace().openURL(nsurl)
}

/**
 * Convert a layer component to base64 representation
 */
const componentToBase64 = function(component, context) {
  const layerAncestry = MSImmutableLayerAncestry.alloc().initWithMSLayer(component)
  const exportRequest = MSExportRequest.exportRequestsFromLayerAncestry(layerAncestry).firstObject()
  const exporter = MSExporter.exporterForRequest_colorSpace(exportRequest, context.document.colorSpace())
  const imageData = exporter.data()

  return String(imageData.base64EncodedStringWithOptions_(0))
}

module.exports = Object.assign(_global, {
  sketch,
  Settings,
  sendMessage,
  pluginActions,
  receiveMessage,
  openURL,
  componentToBase64,
})
