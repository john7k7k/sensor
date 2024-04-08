const path = require('path');
const builder = require('electron-builder');

builder.build({
    projectDir: path.resolve(__dirname),
    win: ['nsis', 'portable'],
    config: {
        "appId": "com.andrewdeveloper.electron.cat",
        "productName": "SGS",
        "directories": {
            "output": "build/win"
        },
        "win": {
            "icon": path.resolve(__dirname, 'icon.png'),
        },
        "extraFiles": [
            {
                "from": "sgs_app_script", // 静态文件夹路径
                "to": "sgs_app_script", // 目标路径（相对于应用程序的根目录）
            }
        ],
        "extraResources": [
            {
                "from": "datas", // 静态文件夹路径
                "to": "datas", // 目标路径（相对于应用程序的根目录）
            }
        ]
    },
})
.then(
    data => console.log(data),
    err => console.error(err)
);