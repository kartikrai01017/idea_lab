import React, { useEffect, useState } from 'react';
import LiveMap from '../components/map/LiveMap';
import AnimeBackground from '../components/common/AnimeBackground';

const HomePage = ({ setCurrentPage, triggerToast }) => {
  const [stats, setStats] = useState({ trees: 0, citizens: 0, recycled: 0, saved: 0 });

  useEffect(() => {
    // Basic count up animation
    let i = 0;
    const targets = { trees: 12847, citizens: 4210, recycled: 98, saved: 320 };
    const int = setInterval(() => {
      i += 0.05;
      if (i > 1) {
        setStats(targets);
        clearInterval(int);
      } else {
        setStats({
          trees: Math.floor(targets.trees * i),
          citizens: Math.floor(targets.citizens * i),
          recycled: Math.floor(targets.recycled * i),
          saved: Math.floor(targets.saved * i)
        });
      }
    }, 50);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="page active fade-in" id="page-home">
      {/* HERO SECTION */}
      <section id="hero">
        <AnimeBackground />
        
        <div className="hero-leaves" id="defaultHeroLeaves">
          <div className="hero-leaf">🌿</div>
          <div className="hero-leaf">🍃</div>
          <div className="hero-leaf">🌱</div>
          <div className="hero-leaf">🍀</div>
          <div className="hero-leaf">🌳</div>
        </div>
        
        <div className="hero-badge"><span className="dot"></span>Mira-Bhayandar Municipal Initiative</div>
        <h1 className="hero-title">Every Action<br/><span className="green">Grows</span> Our <span className="gold">City</span></h1>
        <p className="hero-sub">Join thousands of citizens in Mira-Bhayandar building a greener tomorrow — through tree plantation, recycling, and energy conservation. Your actions are tracked, rewarded, and celebrated.</p>
        
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => setCurrentPage('login')}>🌱 Join Now — It's Free</button>
          <button className="btn-outline" onClick={() => setCurrentPage('tasks')}>Explore Tasks ↗</button>
        </div>
        
        <div className="hero-stats stagger">
          <div className="stat-card">
            <span className="stat-num">{stats.trees.toLocaleString()}</span>
            <div className="stat-label">🌳 Trees Planted</div>
          </div>
          <div className="stat-card">
            <span className="stat-num">{stats.citizens.toLocaleString()}</span>
            <div className="stat-label">👥 Active Citizens</div>
          </div>
          <div className="stat-card">
            <span className="stat-num">{stats.recycled.toLocaleString()}</span>
            <div className="stat-label">♻️ Tons Recycled</div>
          </div>
          <div className="stat-card">
            <span className="stat-num">{stats.saved.toLocaleString()}</span>
            <div className="stat-label">⚡ MWh Saved</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div className="section">
        <div className="section-tag">How It Works</div>
        <h2 className="section-title">Simple. Impactful. Rewarding.</h2>
        <p className="section-sub">Four steps to make Mira-Bhayandar greener — and earn real rewards while doing it.</p>
        <div className="cards-grid stagger">
          <div className="card">
            <span className="card-icon">📋</span>
            <div className="card-accent-bar"></div>
            <div className="card-title">1. Pick a Task</div>
            <p className="card-text">Browse daily eco-tasks — from "don't use your vehicle today" to "plant 5 trees". Each task earns EcoPoints based on difficulty.</p>
          </div>
          <div className="card">
            <span className="card-icon">📸</span>
            <div className="card-accent-bar" style={{background: 'var(--accent2)'}}></div>
            <div className="card-title">2. Complete & Submit Proof</div>
            <p className="card-text">Upload a photo or video as proof. Our AI scanner verifies it's authentic and not AI-generated or digitally manipulated.</p>
          </div>
          <div className="card">
            <span className="card-icon">🏆</span>
            <div className="card-accent-bar" style={{background: 'var(--accent3)'}}></div>
            <div className="card-title">3. Earn & Track</div>
            <p className="card-text">Watch your EcoPoints grow. Unlock badges, climb the leaderboard, and earn government-backed certificates and rewards.</p>
          </div>
          <div className="card">
            <span className="card-icon">🎁</span>
            <div className="card-accent-bar" style={{background: '#8b5cf6'}}></div>
            <div className="card-title">4. Claim Rewards</div>
            <p className="card-text">Redeem points for real gifts — BEST bus passes, municipal rebates, merchandise, and official government recognition.</p>
          </div>
        </div>
      </div>

      {/* LIVE MAP */}
      <LiveMap triggerToast={triggerToast} />
    </div>
  );
};

export default HomePage;
