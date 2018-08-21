const {app, BrowserWindow, ipcMain, Tray, nativeImage} = require('electron')
const path = require('path')

const assetsDir = path.join(__dirname, 'assets')

let tray = undefined
let window = undefined

// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
  // Setup the menubar with an icon
  let icon = nativeImage.createFromDataURL(base64Icon)
  tray = new Tray(icon)

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', function(event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })

  // Make the popup window for the menubar
  window = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    resizable: false,
  })

  // Tell the popup window to load our index.html file
  window.loadURL(`http://overcast.fm/podcasts`)

  // Only close the window on blur if dev tools isn't opened
  window.on('blur', () => {
    if(!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
})

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = window.getBounds()
  let x, y = 0
  if (process.platform == 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height)
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height * 10)
  }


  window.setPosition(x, y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Tray Icon as Base64 so tutorial has less overhead
let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAAB3RJTUUH4ggUFAswplF56wAAAAFvck5UAc+id5oAAASHSURBVEjHnZZbbBRlFMd/31x2p/RGu4UtbGib0s2mFFKaLRXhARFDNNhGjDHGRDSgL/IgJIQXX/uIeEnUGCRRtK0vaIMhNYbCkwgV5NoW0xa2TRGWvcV2d7vdnZnPh+m2IWwN60kmmTnfOf/zz/+cMzOCAiY/1UCxwVZAtVqBfUAQqEAAQoIA5EJC/l6KvG8GuAqcwlJv5LHEB+YTtbRCBEiXQmkShHweKb4AAvlC81kYj+uMJ0qJZ0sAqHbN0VSVoqnaxK0vEtsB7EHI95HiPOlS4J8nSomCCnyiA3iAnxE8u+Dl6t9ufnnoR6nfRVNLB6u8awCIhB8wPjyEPTnIi7VjBNfOL0FLfgc6gZg4lHtKBWwVoBXkZgBbwk9jFdwse5VXDh9k08YWNFV5LMW0XuPW7WH6v/+c0OiP7PXPoDgcNoNoBXm+UKnCBCwFwAcYCBiYKOUv7wEOHf6QqsqygimaqtDWuomGhmN8+XEVA+Mn2bM+BRJjAaugKYUJaGBpLmxV3IvqXGQnBw4eocoOQXKaZS05TZUd4sDBI1xkJ/eiOtiqwNJcWFoxBFTnMjXO3a9hW+d+vOVZuHYczDRL4//Y5Dhn147jLc+yrXM/5+7XgKkt4T01AVMDS2MmpTKtB9jSsRUm+sH7DLgq4eZnYGWQUiKlBCvj+FyVTsxEP1s6tjKtB5hJqY6iZlEKaGCrRJIahtdPdYUB8VHwPQdTA4AkEk/S3d1Nd3c3kXjSUWBqwImJj1JdYWB4/USSDtZyLSjsNVVQID0Pbm8VGjmws+BeCbMhqNvF5T+u0NvbC0BbcAsvB4MwNQj1L4GdRSOHu6yKdFwDE7AphoAGCrikJJdJY6OiCBXMDLg9MDNJILAdv98PQCAQgJnfnDMzA0LFRsXMpHFJBUxlWQLLt8DU8Ggqcw8nmZ2XULYOIlehbjfER2mqr6W5uZnm5maa6mudFtXtdmLK1jE7L0k/nMSjaYszVdwQ5jQ8mk5lbILhkRFo7ITQWXBVQNtRwpEE0WiUaDRKOJKAtqPOWegsNHYyPDJCZWwCj6ZDrughdNZGSI0dJSkGT/cxZ6yHxi7IJMBVyfUbt2hvbycYDHL9xk1nAzIJaOxizljP4Ok+dpSkEPL/rKHzIrIwNdrKdWrvXKCvpwerrguqNyCl5PLlS8RiMRKJBENDQ846Vm/Aquuir6eH2jsXaCvX8/JbxW2BwzYC5ATob9ZITvSf4Kt0ijfe2kc2k8HlcnH37l1WrFiBz+cjHA7jMgx++O4U2V97eW81CFsDyC1gFbTCX8N32wHqkOIc4AfIWDZnYpLb3hbEmgbuhx/h8/kwczkeRSKsXb0K+SDExvAwXR4FQ12EHkPIF4Ap8fWVIhSQYgohjwEfAWWGUHi9BrYnRxn68zb6nMB+NIGQkvrZOC3T0FGu4qvRHQxn7ZLAsQWsIlqQD7aVkyAjIN5eUKLE51bYa+jslZC1ZgFwrTSW/oqcwnPAGMhvQZxBsVmOQMEWAMh3ti492Iob5wfF+K+cfCqQAWIo9vxioW8uFQz+F0O40bKUHh9LAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA4LTIxVDAwOjExOjU3LTA0OjAwSv+VQgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wOC0yMVQwMDoxMTo0OC0wNDowMAFAXYkAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC`
