import React, { useState, useEffect } from 'react';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    window.taskAPI.loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    window.taskAPI.saveTasks(tasks);
  }, [tasks]);

  const cycleStatus = (index) => {
    const statusOrder = ['未开始', '进行中', '已完成'];
    const newTasks = [...tasks];
    const current = newTasks[index].status;
    const next = statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length];
    newTasks[index].status = next;
    setTasks(newTasks);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const moveDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div style={{ padding: '1em' }}>
      <h2>📊 全部任务看板</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>#</th>
            <th>任务内容</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{task.text}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => moveUp(i)}>⬆</button>
                <button onClick={() => moveDown(i)}>⬇</button>
                <button onClick={() => cycleStatus(i)}>🔁</button>
                <button onClick={() => deleteTask(i)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}