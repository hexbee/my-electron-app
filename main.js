// main.js

// 控制应用生命周期和创建原生浏览器窗口的模块
const { app, BrowserWindow } = require('electron');
const path = require('path'); // Node.js 的 path 模块，用于处理文件和目录路径

// 创建浏览器窗口
function createWindow() {
    // 创建一个新的浏览器窗口实例
    const mainWindow = new BrowserWindow({
        width: 800, // 窗口宽度
        height: 600, // 窗口高度
        webPreferences: {
            // __dirname 指向当前执行脚本所在的目录 (my-electron-app)
            // path.join 用于创建跨平台的路径字符串
            preload: path.join(__dirname, 'preload.js') // 指定预加载脚本
        }
    });

    // 加载 index.html 文件到窗口中
    mainWindow.loadFile('index.html');

    // 你也可以加载一个 URL
    // mainWindow.loadURL('https://www.electronjs.org');

    // 或者，更简单地，直接加载一个包含 HTML 内容的数据 URL (适合纯文本 Hello World)
    // mainWindow.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent('<!DOCTYPE html><html><body><h1>Hello World!</h1></body></html>')}`);


    // 可选：打开开发者工具（用于调试）
    // mainWindow.webContents.openDevTools();
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow();

    // 在 macOS 上，当单击 dock 图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 在 Windows 和 Linux 上，当所有窗口都关闭时退出应用程序。
// 对于 macOS，通常应用程序及其菜单栏会保持活动状态，直到用户使用 Cmd + Q 显式退出。
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') { // darwin 表示 macOS
        app.quit();
    }
});

// 在这个文件中，你可以包含应用程序剩余的主进程代码。
// 你也可以将它们分成几个文件，然后用 require() 引入。
