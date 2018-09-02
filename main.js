// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// react/response on ipc event defined in renderer.js
ipcMain.on('open-directory-dialog', function (event) {
    dialog.showOpenDialog(mainWindow, {
        title: 'Select a directory...',
        properties: ['openDirectory']
    }, function (files) {
        if (files) {
            event.sender.send('selectedItem', files)
        }
    })
})

// react on dialog buttons
ipcMain.on('display-dialog', function (event, dialogType) {
    console.log(dialogType);
    if(dialogType === 'error') {
        dialog.showErrorBox('Frak!', 'Cyclons reported on the port hanger deck.')
    } else {
        dialog.showMessageBox({
            type: dialogType,
            defaultId: 0,
            cancelId: 1,
            title: 'Save something',
            message: 'Save what ever you want.',
            detail: 'Message detail',
            buttons: ['Save', 'Cancel', 'Don\`t save'],
        }, function (index) {
            // additional actions can be defined here
            console.log(index);
        })
    }
})
