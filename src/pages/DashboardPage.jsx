import React, { useState, useEffect } from 'react';
import { LEADERBOARD, ACTIVITY_LOG } from '../data/mockData';
import { apiFetch } from '../api';

const DashboardPage = ({ userPoints, userName, userStreak }) => {
  const currentPoints = Math.max(0, userPoints);
  const [liveBoard, setLiveBoard] = useState([]);
  const [boardLoading, setBoardLoading] = useState(true);
  const [myRank, setMyRank] = useState(null);

  const fetchLeaderboard = () => {
    apiFetch('/api/users/leaderboard')
      .then(r => r.json())
      .then(data => {
        setLiveBoard(data);
        setBoardLoading(false);
        // find current user rank
        const idx = data.findIndex(u => u.name === userName);
        if (idx !== -1) setMyRank(idx + 1);
      })
      .catch(() => { setBoardLoading(false); });
  };

  useEffect(() => {
    if (userName) fetchLeaderboard();
    const t = setInterval(fetchLeaderboard, 20000);
    return () => clearInterval(t);
  }, [userName]);

  // Merge live board with mock fall-back if server down
  const displayBoard = liveBoard.length > 0 ? liveBoard : LEADERBOARD;
  const isLive = liveBoard.length > 0;

  // Calculate Level and Progress
  let level = 1;
  let nextTier = 1000;
  if (currentPoints >= 1000 && currentPoints < 3000) { level = 2; nextTier = 3000; }
  else if (currentPoints >= 3000 && currentPoints < 5000) { level = 3; nextTier = 5000; }
  else if (currentPoints >= 5000) { level = 4; nextTier = 10000; }
  
  const progressPercent = Math.min(100, Math.round((currentPoints / nextTier) * 100));

  return (
    <div className="page active fade-in" id="page-dashboard">
      <div className="section">
        <h2 className="section-title">Your Progress Dashboard</h2>
        <p className="section-sub">Track your impact, points, and standing in Mira-Bhayandar.</p>

        <div className="dash-grid" style={{ marginBottom: '40px' }}>
          <div className="dash-card">
            <h3>Total EcoPoints</h3>
            <span className="big-num">{currentPoints.toLocaleString()}</span>
            <div className="xp-bar-wrap">
              <div className="xp-labels">
                <span>Level {level} 🌱</span>
                <span>{currentPoints.toLocaleString()} / {nextTier.toLocaleString()} pts</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: '12px' }}>Next unlock: Level {level + 1} Badge</p>
          </div>

          <div className="dash-card">
            <h3>City Rank</h3>
            <span className="big-num" style={{ color: 'var(--accent2)' }}>#342</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text)', marginTop: '8px', fontWeight: 600 }}>Top 8% in Mira Road East</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: '12px', lineHeight: 1.5 }}>
              You jumped 14 spots this week! Complete 3 more tasks to break into the Top 300.
            </p>
          </div>

          <div className="dash-card">
            <h3>Your Impact</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)' }}>3</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Trees<br/>Planted</div>
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)' }}>45</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Liters<br/>Saved</div>
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)' }}>8<span style={{ fontSize: '0.9rem' }}>kg</span></div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Plastic<br/>Recycled</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="dash-card">
            <h3 style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              City Leaderboard
              {isLive
                ? <span style={{ fontSize:'0.72rem', color:'var(--accent)', background:'rgba(74,124,89,0.12)', padding:'2px 8px', borderRadius:'50px', fontWeight:700 }}>🟢 LIVE</span>
                : <span style={{ fontSize:'0.72rem', color:'var(--text2)', padding:'2px 8px', background:'var(--bg3)', borderRadius:'50px' }}>📡 Demo</span>}
            </h3>
            {boardLoading && <p style={{ color:'var(--text2)', fontSize:'0.85rem' }}>Loading leaderboard...</p>}
            <div id="leaderboard-dash">
              {displayBoard.slice(0, 6).map((u, i) => {
                const isYou = isLive ? (u.name === userName) : u.isYou;
                return (
                  <div key={i} className={`leaderboard-item rank-${i+1}`} style={isYou ? { background: 'rgba(74,124,89,0.12)', border: '1px solid var(--accent)' } : {}}>
                    <div className="rank-badge">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`}</div>
                    <div className="lb-avatar" style={isYou ? { background: 'var(--accent2)' } : {}}>
                      {isYou && userName ? userName.charAt(0).toUpperCase() : (isLive ? u.name.charAt(0).toUpperCase() : u.avatar)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="lb-name">
                      {isYou ? (userName || 'You') : u.name}
                      {isLive && u.current_streak > 0 && <span style={{ marginLeft: '4px', fontSize: '0.8rem' }} title={`Active streak: ${u.current_streak} days`}>🔥{u.current_streak}</span>}
                      {isYou && <span style={{ background: 'var(--accent2)', color: '#1a0a00', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', marginLeft: '4px' }}>YOU</span>}
                    </div>
                      <div className="lb-city">{isLive ? `${u.task_count || 0} tasks completed` : u.area}</div>
                    </div>
                    <div className="lb-pts">{(isLive ? u.points : u.pts).toLocaleString()} pts</div>
                  </div>
                );
              })}
            </div>
            <button className="btn-outline" style={{ width: '100%', marginTop: '16px', padding: '8px' }}
              onClick={fetchLeaderboard}>🔄 Refresh</button>
          </div>

          <div className="dash-card">
            <h3>Recent Activity</h3>
            <div id="activityLog">
              {ACTIVITY_LOG.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{a.text}</div>
                    <div style={{ fontSize: '0.77rem', color: 'var(--text2)' }}>{a.time}</div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '0.85rem' }}>{a.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
