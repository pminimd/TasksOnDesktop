文件结构说明

```csharp
task-float-app/
│
├── main/                 # Electron 主进程
│   ├── index.js          # Electron 入口
│   └── taskStorage.js    # 本地任务读写模块
│
├── preload/              # Electron 安全暴露 API
│   └── index.js
│
├── renderer/             # React + Vite 前端
│   ├── App.jsx
│   ├── FloatingTasks.jsx
│   ├── TaskBoard.jsx
│   └── main.jsx
│
├── tasks.json            # 本地任务数据存储
├── build/                # 前端构建产物目录（由 vite 构建）
├── dist/                 # electron-builder 打包目录（自动生成）
├── vite.config.js        # Vite 配置
└── package.json          # 项目信息和构建脚本
```

打包构建命令

开发时
```bash
npm install
npm run dev
```
构建Windows安装包（可执行安装）
```bash
npm run build
# 安装完成后可以在dist/目录下看到生成的安装包
```
