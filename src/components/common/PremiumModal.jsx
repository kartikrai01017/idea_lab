import React from 'react';

const PremiumModal = ({ show, onClose, triggerToast }) => {
  if (!show) return null;

  const handleUpgrade = () => {
    triggerToast('🎉 Redirecting to payment gateway...');
    onClose();
  };

  return (
    <div className="modal-overlay show">
      <div className="modal premium-modal">
        <div className="modal-header">
          <div className="modal-title">👑 EcoMira Premium</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: '4px' }}>
          Upgrade to unlock exclusive benefits — and support the platform that keeps Mira-Bhayandar green.
        </p>

        <div className="premium-price">
          <div className="price">₹99 <span style={{ fontSize: '1rem' }}>/month</span></div>
          <div className="period">or ₹899/year — Save 25%</div>
        </div>

        <div className="badge-grid">
          <div className="premium-badge"><span className="emoji">👑</span><p>Gold Crown Badge</p></div>
          <div className="premium-badge"><span className="emoji">⚡</span><p>Lightning Streak Badge</p></div>
          <div className="premium-badge"><span className="emoji">🌟</span><p>Star Citizen Badge</p></div>
          <div className="premium-badge"><span className="emoji">🎽</span><p>EcoMira Merch</p></div>
          <div className="premium-badge"><span className="emoji">🥇</span><p>Leaderboard Priority</p></div>
          <div className="premium-badge"><span className="emoji">🎁</span><p>Exclusive Gifts</p></div>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: '16px' }}>
          ✅ Priority reward access &nbsp; ✅ Exclusive premium tasks &nbsp; ✅ Ad-free experience &nbsp; ✅ Direct MBMC contact line
        </div>

        <button className="btn-premium" style={{ width: '100%', padding: '14px', fontSize: '1rem' }} onClick={handleUpgrade}>
          Upgrade to Premium 👑
        </button>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <a style={{ fontSize: '0.8rem', color: 'var(--text2)', cursor: 'pointer' }} onClick={onClose}>Maybe later</a>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
