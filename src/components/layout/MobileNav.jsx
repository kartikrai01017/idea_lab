import React from 'react';
import { useNavigate } from 'react-router-dom';


const MobileNav = ({  }) => {
  const navigate = useNavigate();
  return (
    <nav className="mobile-nav">
      <button className={`mob-nav-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <span className="ico">🏠</span>Home
      </button>
      <button className={`mob-nav-btn ${currentPage === 'tasks' ? 'active' : ''}`} onClick={() => navigate('/tasks')}>
        <span className="ico">✅</span>Tasks
      </button>
      <button className={`mob-nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
        <span className="ico">📊</span>Dash
      </button>
      <button className={`mob-nav-btn ${currentPage === 'achievements' ? 'active' : ''}`} onClick={() => navigate('/achievements')}>
        <span className="ico">🏆</span>Awards
      </button>
      <button className={`mob-nav-btn ${currentPage === 'upload' ? 'active' : ''}`} onClick={() => navigate('/upload')}>
        <span className="ico">📸</span>Upload
      </button>
    </nav>
  );
};

export default MobileNav;
