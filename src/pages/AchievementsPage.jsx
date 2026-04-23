import React from 'react';
import { ACHIEVEMENTS } from '../data/mockData';

const AchievementsPage = () => {
  return (
    <div className="page active fade-in" id="page-achievements">
      <div className="section">
        <h2 className="section-title">Badges & Achievements</h2>
        <p className="section-sub">Unlock unique badges by hitting eco milestones. Premium badges offer extra city perks!</p>

        <div className="ach-grid" id="achGrid">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className={`ach-card ${a.locked ? 'locked' : ''} ${a.premium ? 'premium-ach' : ''}`}>
              <span className="ach-icon">{a.icon}</span>
              <div className="ach-name">{a.name}</div>
              <div className="ach-desc">{a.desc}</div>
              {!a.locked 
                ? <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>✅ Unlocked</div>
                : <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text2)' }}>🔒 Locked</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
