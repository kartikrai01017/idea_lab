import React from 'react';

const Navbar = ({ currentPage, setCurrentPage, setShowThemePanel, toggleMode, isDarkMode, setShowPremium, setShowAuth, userStreak }) => {
  return (
    <nav id="navbar">
      <div className="nav-logo" onClick={() => setCurrentPage('home')}>
        <span className="leaf-icon">🌱</span>
        Eco<span>Mira</span>
      </div>
      <div className="nav-links">
        <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>Home</button>
        <button onClick={() => setCurrentPage('tasks')} className={currentPage === 'tasks' ? 'active' : ''}>Tasks</button>
        <button onClick={() => setCurrentPage('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>Dashboard</button>
        <button onClick={() => setCurrentPage('achievements')} className={currentPage === 'achievements' ? 'active' : ''}>Achievements</button>
        <button onClick={() => setCurrentPage('rewards')} className={currentPage === 'rewards' ? 'active' : ''}>Rewards</button>
        <button onClick={() => setCurrentPage('upload')} className={currentPage === 'upload' ? 'active' : ''}>Submit Proof</button>
      </div>
      <div className="nav-actions">
        {userStreak > 0 && <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginRight: '8px', display: 'flex', alignItems: 'center' }}>🔥 <span style={{ fontSize: '0.8rem', marginLeft: '4px' }}>{userStreak}</span></div>}
        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setShowThemePanel(p => !p); }} title="Themes">🎨</button>
        <button className="icon-btn" onClick={toggleMode} title="Dark Mode">{isDarkMode ? '☀️' : '🌙'}</button>
        <button className="btn-premium" onClick={() => setShowPremium(true)}>👑 Premium</button>
        <button className="btn-primary" style={{ padding: '7px 16px', fontSize: '0.87rem' }} onClick={() => setCurrentPage('login')}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
