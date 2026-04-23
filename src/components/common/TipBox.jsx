import React from 'react';

const TipBox = ({ tip, show, onClose }) => {
  if (!tip) return null;

  return (
    <div id="tip-box" className={show ? 'show' : ''}>
      <div className="tip-header">
        <span className="tip-title">🌿 Eco Tip</span>
        <button className="tip-close" onClick={onClose}>✕</button>
      </div>
      <span className="tip-icon">{tip.icon}</span>
      <p className="tip-text">{tip.text}</p>
    </div>
  );
};

export default TipBox;
