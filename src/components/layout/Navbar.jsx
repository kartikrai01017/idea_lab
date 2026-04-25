import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ setShowThemePanel, toggleMode, isDarkMode, setShowPremium, userStreak, userName, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav id="navbar">
      
      <div className="nav-logo" onClick={() => navigate('/')}>
        <span className="leaf-icon">🌱</span>
        Eco<span>Mira</span>
      </div>

      <div className="nav-links">
        <button 
          onClick={() => navigate('/')} 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </button>

        <button 
          onClick={() => navigate('/tasks')} 
          className={location.pathname === '/tasks' ? 'active' : ''}
        >
          Tasks
        </button>

        <button 
          onClick={() => navigate('/dashboard')} 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </button>

        <button 
          onClick={() => navigate('/achievements')} 
          className={location.pathname === '/achievements' ? 'active' : ''}
        >
          Achievements
        </button>

        <button 
          onClick={() => navigate('/rewards')} 
          className={location.pathname === '/rewards' ? 'active' : ''}
        >
          Rewards
        </button>

        <button 
          onClick={() => navigate('/upload')} 
          className={location.pathname === '/upload' ? 'active' : ''}
        >
          Submit Proof
        </button>
      </div>

      <div className="nav-actions">
        {userStreak > 0 && (
          <div style={{ 
            fontSize: '1.2rem', 
            fontWeight: 600, 
            color: 'var(--text)', 
            marginRight: '8px', 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            🔥 <span style={{ fontSize: '0.8rem', marginLeft: '4px' }}>{userStreak}</span>
          </div>
        )}

        <button 
          className="icon-btn" 
          onClick={(e) => { 
            e.stopPropagation(); 
            setShowThemePanel(p => !p); 
          }} 
          title="Themes"
        >
          🎨
        </button>

        <button 
          className="icon-btn" 
          onClick={toggleMode} 
          title="Dark Mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <button 
          className="btn-premium" 
          onClick={() => setShowPremium(true)}
        >
          👑 Premium
        </button>

        {userName ? (
          <>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--accent)',
              padding: '6px 12px',
              background: 'rgba(74,124,89,0.1)',
              borderRadius: '20px',
              border: '1px solid var(--accent)'
            }}>
              👤 {userName}
            </span>

            <button
              className="btn-primary"
              style={{ 
                padding: '7px 16px', 
                fontSize: '0.87rem', 
                background: 'var(--accent3)', 
                borderColor: 'var(--accent3)' 
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn-primary"
            style={{ padding: '7px 16px', fontSize: '0.87rem' }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;