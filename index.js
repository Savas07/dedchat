const { app, BrowserWindow } = require('electron');
const remote = require('electron').remote;
const path = require('path');

function createWindow() {
    // Tarayıcı penceresini oluştur.
    let win = new BrowserWindow({
        width: 1080,
        height: 540,
        frame: false,
        resizable: false,
        backgroundColor: '#2e2c29',
        icon: __dirname + '/PUBLIC/icons/logo.png',
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
            allowRunningInsecureContent: true

        }
    });

    // ve uygulamanın index.html dosyasını yükle.

    // win.loadFile(path.join(__dirname, 'PUBLIC/index.html'));

    win.loadURL('http://25.143.55.100:3000/index.html');

};


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/*
document.getElementById("close-btn").addEventListener("click", function (e) {
        var window = remote.getCurrentWindow();
        window.close();
    });
*/

