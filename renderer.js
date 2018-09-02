const ipc = require('electron').ipcRenderer;

// define all buttons
const selectDirBtn = document.getElementById('select-directory');
const infoBtn = document.getElementById('info');
const errorBtn = document.getElementById('error');
const questionBtn = document.getElementById('question');
const noneBtn = document.getElementById('none');

// bind click event to select directory button
selectDirBtn.addEventListener('click', function() {
    ipc.send('open-directory-dialog');
})

// react on response from main.js
ipc.on('selectedItem', function (event, path) {
    document.getElementById('selectItem').innerHTML = 'your selected file: ${path}';
})

// bind click event to every dialog button
infoBtn.addEventListener('click', function (event) {
    ipc.send('display-dialog', 'info');
})

errorBtn.addEventListener('click', function (event) {
    ipc.send('display-dialog', 'error');
})

questionBtn.addEventListener('click', function (event) {
    ipc.send('display-dialog', 'question');
})

noneBtn.addEventListener('click', function (event) {
    ipc.send('display-dialog', 'none');
})
