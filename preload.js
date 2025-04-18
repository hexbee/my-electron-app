// preload.js

// 所有的 Node.js API 都可以在预加载过程中使用。
// 它拥有与 Chrome 扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    // 将版本信息显示在 HTML 页面上（如果使用了 index.html）
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});

// 如果你需要更安全地暴露 API 给渲染进程，而不是直接修改 window 对象，
// 可以使用 contextBridge (更推荐的方式，虽然这个 Hello World 没用到)
// const { contextBridge } = require('electron');
// contextBridge.exposeInMainWorld('myAPI', {
//   doSomething: () => { console.log('Did something!'); }
// });
