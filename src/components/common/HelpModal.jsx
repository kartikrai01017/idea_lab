import React from 'react';

const HelpModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">❓ Help Center</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="help-item">
          <div className="help-q">How do I earn EcoPoints?</div>
          <div className="help-a">Complete eco tasks (available on the Tasks page), submit photo proof, and get verified. Points are credited within 24 hours after AI verification.</div>
        </div>
        <div className="help-item">
          <div className="help-q">What proof is accepted?</div>
          <div className="help-a">Clear photos or short videos of your eco action. AI verification checks for authenticity. No filters, edits, or AI-generated images are accepted.</div>
        </div>
        <div className="help-item">
          <div className="help-q">How do I claim government rewards?</div>
          <div className="help-a">Once you reach a reward milestone, click "Claim" on the Rewards page. For physical items, MBMC will contact you within 3-5 working days.</div>
        </div>
        <div className="help-item">
          <div className="help-q">What is Premium membership?</div>
          <div className="help-a">Premium members get exclusive badges, priority reward access, EcoMira merchandise, and special recognition on the city leaderboard.</div>
        </div>
        <div className="help-item">
          <div className="help-q">Contact MBMC Helpline</div>
          <div className="help-a">📞 1800-XXX-XXXX (Toll-free) • 📧 eco@mbmc.gov.in • Office hours: Mon-Sat 9AM–6PM</div>
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={onClose}>Got It!</button>
      </div>
    </div>
  );
};

export default HelpModal;
