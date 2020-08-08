const $ = require('jquery');
const { remote } = require('electron');

var win = remote.getCurrentWindow();

$('#minimize-btn').click(function () {
    win.minimize();
});

$('#maximize-btn').click(function () {
    if (!win.isMaximized()) {
        win.maximize();
    }
    else {
        win.unmaximize();
    }
});

$('#close-btn').click(function () {
    win.close();
});