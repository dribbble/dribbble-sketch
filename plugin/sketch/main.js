import BrowserWindow from 'sketch-module-web-view'

export default function(context) {
  const browser = new BrowserWindow({
    width: 600,
    height: 350,
    frame: false,
    movable: true,
    resizable: false,
    alwaysOnTop: false,
    backgroundColor: '#f4f4f4',
    title: 'Share to Dribbble',
  })

  const view = require('../web/main.html')
  browser.loadURL(view)
}
