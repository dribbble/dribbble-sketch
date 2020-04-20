const BrowserWindow = require('sketch-module-web-view')
const _ = require('./library/utils')

module.exports = function(context) {
  const selectionSize = context.selection.count()
  let selectedComponent, nativeComponent

  if (selectionSize > 0) {
    nativeComponent = context.selection[0]
    selectedComponent = _.sketch.fromNative(nativeComponent)
  }

  let browser = new BrowserWindow({
    identifier: _.config.browserIdentifier,
    width: 600,
    height: 350,
    movable: true,
    resizable: false,
    alwaysOnTop: false,
    backgroundColor: '#f4f4f4',
    title: 'Share to Dribbble',
    frame: false,
  })

  _.pluginActions.closeBrowser = function() {
    browser.close()
  }

  _.pluginActions.setBrowserSize = function({ width, height, animated=false }={}) {
    const current = browser.getSize()
    browser.setSize(width || current[0], height || current[1], animated)
    browser.center()
  }

  _.pluginActions.requestSelectionImage = function() {
    const imageData = _.componentToBase64(nativeComponent, context)
    _.sendMessage('receiveSelectionImage', { imageData: imageData })
  }

  _.pluginActions.requestContext = function() {
    _.sendMessage('receiveContext', {
      authToken: _.Settings.settingForKey('auth-token'),
      userDetails: _.Settings.settingForKey('user-details'),
      selectionSize: selectionSize,
      selection: selectedComponent != null
        ? { name: selectedComponent.name, frame: selectedComponent.frame.toJSON() }
        : undefined
    })
  }

  browser.on('closed', () => { browser = null })
  browser.webContents.on('pluginMessage', _.receiveMessage)
  browser.show()
  browser.focus()

  const view = require('../web/main.html')
  browser.loadURL(view)
}
