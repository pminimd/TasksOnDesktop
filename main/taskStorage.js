// 本地任务读写模块
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../tasks.json');

function loadTasks() {
  try {
    if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]');
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('加载任务失败:', e);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
  } catch (e) {
    console.error('保存任务失败:', e);
  }
}

module.exports = { loadTasks, saveTasks };