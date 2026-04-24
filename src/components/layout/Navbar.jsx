import React from 'react';

const Navbar = ({ currentPage, setCurrentPage, setShowThemePanel, toggleMode, isDarkMode, setShowPremium, userStreak, userName, handleLogout }) => {
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
        {userStreak > 0 && (
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginRight: '8px', display: 'flex', alignItems: 'center' }}>
            🔥 <span style={{ fontSize: '0.8rem', marginLeft: '4px' }}>{userStreak}</span>
          </div>
        )}
        <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setShowThemePanel(p => !p); }} title="Themes">🎨</button>
        <button className="icon-btn" onClick={toggleMode} title="Dark Mode">{isDarkMode ? '☀️' : '🌙'}</button>
        <button className="btn-premium" onClick={() => setShowPremium(true)}>👑 Premium</button>

        {userName ? (
          <>
            <span style={{
              fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)',
              padding: '6px 12px', background: 'rgba(74,124,89,0.1)',
              borderRadius: '20px', border: '1px solid var(--accent)'
            }}>
              👤 {userName}
            </span>
            <button
              className="btn-primary"
              style={{ padding: '7px 16px', fontSize: '0.87rem', background: 'var(--accent3)', borderColor: 'var(--accent3)' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn-primary"
            style={{ padding: '7px 16px', fontSize: '0.87rem' }}
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

