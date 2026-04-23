import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';
// Removing mockData import for tasks

const TasksPage = ({ triggerToast }) => {
  const [filter, setFilter] = useState('all');
  const [accepted, setAccepted] = useState(new Set());
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    apiFetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasksList(data))
      .catch(err => console.error(err));
  }, []);

  const filteredTasks = filter === 'all' 
    ? tasksList 
    : tasksList.filter(t => t.difficulty === filter || t.category === filter);

  const handleAccept = (task) => {
    if (accepted.has(task.id)) return;
    setAccepted(new Set(accepted).add(task.id));
    triggerToast(`🌿 Task accepted: "${task.title}" — Go do it and submit proof!`);
  };

  return (
    <div className="page active fade-in" id="page-tasks">
      <div className="tasks-header">
        <h1>Daily Eco-Tasks</h1>
        <p>Complete tasks to earn EcoPoints and climb the city leaderboard.</p>
      </div>
      
      <div className="tasks-filter">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'easy' ? 'active' : ''}`} onClick={() => setFilter('easy')}>Easy</button>
        <button className={`filter-btn ${filter === 'medium' ? 'active' : ''}`} onClick={() => setFilter('medium')}>Medium</button>
        <button className={`filter-btn ${filter === 'hard' ? 'active' : ''}`} onClick={() => setFilter('hard')}>Hard</button>
        <button className={`filter-btn ${filter === 'transport' ? 'active' : ''}`} onClick={() => setFilter('transport')}>Transport</button>
        <button className={`filter-btn ${filter === 'waste' ? 'active' : ''}`} onClick={() => setFilter('waste')}>Waste</button>
      </div>

      <div className="section" style={{ paddingTop: '20px' }}>
        <div id="tasksList">
          {filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text2)', padding: '40px' }}>No tasks found.</div>
          ) : (
            filteredTasks.map(task => {
              const isAccepted = accepted.has(task.id);
              return (
                <div key={task.id} className="task-card fade-in" style={{ marginBottom: '12px' }}>
                  <div className="task-icon-box">{task.icon}</div>
                  <div className="task-meta">
                    <div className="task-title">{task.title}</div>
                    <div className="task-desc">{task.desc}</div>
                    <div className="task-tags">
                      <span className={`tag tag-${task.difficulty}`}>{task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}</span>
                      <span className="tag" style={{ background: 'var(--bg3)', color: 'var(--text2)' }}>{task.category}</span>
                      {task.creative && <span className="tag" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6' }}>Creative</span>}
                    </div>
                  </div>
                  <div className="task-reward">
                    <div className="pts-badge">+{task.pts} pts</div>
                    <button 
                      className={`btn-accept ${isAccepted ? 'accepted' : ''}`} 
                      onClick={() => handleAccept(task)}
                    >
                      {isAccepted ? '✅ Accepted' : 'Accept'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
