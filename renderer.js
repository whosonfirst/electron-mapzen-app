const ipcRenderer = require('electron').ipcRenderer;

const electron = require('electron');

var show_s = document.getElementById("show-settings");
show_s.onclick = function(){ ipcRenderer.send('renderer', 'settings'); };
