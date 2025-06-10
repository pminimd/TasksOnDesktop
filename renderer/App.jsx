import React, { useState } from 'react';
import FloatingTasks from './FloatingTasks';
import TaskBoard from './TaskBoard';

export default function App() {
  const [view, setView] = useState('float');
  return (
    <div className="draggable">
      <h1 style={{ color: 'white', padding: '1rem' }}>任务浮窗</h1>
      <div className="no-drag" style={{ position: 'absolute', top: 10, right: 10 }}>
        <button onClick={() => window.close()}>关闭</button>
      </div>
      <div className="no-drag" style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => setView('float')}>🪟 浮窗</button>
        <button onClick={() => setView('board')}>📋 看板</button>
      </div>
      {view === 'float' ? <FloatingTasks /> : <TaskBoard />}
    </div>
  );
}