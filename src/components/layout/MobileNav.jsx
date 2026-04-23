import React from 'react';

const MobileNav = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="mobile-nav">
      <button className={`mob-nav-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>
        <span className="ico">🏠</span>Home
      </button>
      <button className={`mob-nav-btn ${currentPage === 'tasks' ? 'active' : ''}`} onClick={() => setCurrentPage('tasks')}>
        <span className="ico">✅</span>Tasks
      </button>
      <button className={`mob-nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>
        <span className="ico">📊</span>Dash
      </button>
      <button className={`mob-nav-btn ${currentPage === 'achievements' ? 'active' : ''}`} onClick={() => setCurrentPage('achievements')}>
        <span className="ico">🏆</span>Awards
      </button>
      <button className={`mob-nav-btn ${currentPage === 'upload' ? 'active' : ''}`} onClick={() => setCurrentPage('upload')}>
        <span className="ico">📸</span>Upload
      </button>
    </nav>
  );
};

export default MobileNav;
