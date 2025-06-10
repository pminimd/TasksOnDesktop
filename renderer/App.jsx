import React, { useState } from 'react';
import FloatingTasks from './FloatingTasks';
import TaskBoard from './TaskBoard';

export default function App() {
  const [view, setView] = useState('float');
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => setView('float')}>🪟 浮窗</button>
        <button onClick={() => setView('board')}>📋 看板</button>
      </div>
      {view === 'float' ? <FloatingTasks /> : <TaskBoard />}
    </div>
  );
}