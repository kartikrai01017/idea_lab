import React, { useState } from 'react';
import { apiFetch } from '../api';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ triggerToast, onLoginSuccess }) => {
  const navigate =useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await apiFetch(endpoint, {
        method: 'POST',
        // Content-Type is auto appended by apiFetch wrapper
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      // Store token
      localStorage.setItem('token', data.token);
      triggerToast(`🎉 Welcome to EcoMira!`);
      
      // Tell App.jsx we logged in
      if (onLoginSuccess) {
        await onLoginSuccess();}
      
       navigate('/dashboard');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page active fade-in auth-wrap" id="page-login">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="big-leaf">🌿</div>
          <div className="auth-title">Welcome to EcoMira</div>
          <div className="auth-sub">Make Mira-Bhayandar greener, starting today.</div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: 'var(--accent3)', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</div>}
          
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="e.g. Shivesh" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="e.g. shivesh@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="btn-primary btn-full">{isLogin ? 'Secure Login' : 'Register'}</button>
        </form>

        <div className="auth-switch">
          {isLogin ? "New here?" : "Already have an account?"} <a onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Create an account' : 'Log in here'}</a>
        </div>

        <div className="social-divider">
          <hr/><span>OR</span><hr/>
        </div>

        <button className="btn-google" onClick={() => { navigate('/'); triggerToast('🎉 Authenticated via Google!'); }}>
          Continue with Google
        </button>

        <div style={{ background: '#f8f9fa', padding: '14px 16px', borderTop: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between', marginTop: '24px', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#5f6368', fontFamily: 'sans-serif' }}>🔒 Secure sign-in</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a style={{ fontSize: '0.75rem', color: '#1a73e8', fontFamily: 'sans-serif', textDecoration: 'none', cursor: 'pointer' }}>Privacy</a>
            <a style={{ fontSize: '0.75rem', color: '#1a73e8', fontFamily: 'sans-serif', textDecoration: 'none', cursor: 'pointer' }}>Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
