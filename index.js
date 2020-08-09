const { app, BrowserWindow } = require('electron');
const remote = require('electron').remote;

function createWindow() {
    // Tarayıcı penceresini oluştur.
    let win = new BrowserWindow({
        width: 1080,
        height: 540,
        frame: false,
        resizable: false,
        icon: __dirname + '/PUBLIC/icons/logo.png',
        webPreferences: {
            nodeIntegration: true
        }
    });

    // ve uygulamanın index.html dosyasını yükle.

    win.loadFile('PUBLIC/index.html');


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

