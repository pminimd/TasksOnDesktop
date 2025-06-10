import React, { useState, useEffect } from 'react';

export default function FloatingTasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    window.taskAPI.loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    window.taskAPI.saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, status: '未开始' }]);
    setInput('');
  };

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

  return (
    <div style={{ userSelect: 'none', padding: '1em', background: '#ffffcc', width: 280 }}>
      <div style={{ WebkitAppRegion: 'drag', fontWeight: 'bold', marginBottom: 10 }}>
        📋 我的任务清单
      </div>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {tasks.filter(t => t.status !== '已完成').map((task, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
            <span style={{ flex: 1 }}>
              [{task.status}] {task.text}
            </span>
            <button onClick={() => moveUp(i)}>⬆</button>
            <button onClick={() => moveDown(i)}>⬇</button>
            <button onClick={() => cycleStatus(i)}>🔁</button>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          style={{ flex: 1 }}
          type="text"
          value={input}
          placeholder="添加任务..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>＋</button>
      </div>
    </div>
  );
}