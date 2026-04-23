import React from 'react';

const RewardsPage = ({ triggerToast, userName }) => {
  return (
    <div className="page active fade-in" id="page-rewards">
      <div className="section">
        <h2 className="section-title">Claim Your Rewards</h2>
        <p className="section-sub">Redeem your EcoPoints for official government recognitions and real-world benefits in Mira-Bhayandar.</p>

        <div className="govt-banner">
          <div className="govt-logo">🏛️</div>
          <div className="govt-text">
            <h3>Official MBMC Initiative</h3>
            <p>Mira-Bhayandar Municipal Corporation verifies & issues all rewards below. High achievers may be invited to the annual Republic Day city honors.</p>
          </div>
        </div>

        <div className="dash-grid">
          <div className="dash-card reward-card" style={{ background: 'linear-gradient(135deg,var(--accent2),#d48806)' }}>
            <div className="reward-title">1-Month BEST Bus Pass</div>
            <div className="reward-desc">Free travel across Mira-Bhayandar on municipal AC buses. Valid for 30 days.</div>
            <div className="reward-progress"><div className="reward-fill" style={{ width: '46%' }}></div></div>
            <div className="reward-pts">2,340 / 5,000 pts needed</div>
            <button className="btn-outline" style={{ marginTop: '16px', background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'transparent', width: '100%' }} disabled>Not enough points</button>
          </div>

          <div className="dash-card reward-card" style={{ background: 'linear-gradient(135deg,#c75d3f,#9a3f25)' }}>
            <div className="reward-title">Property Tax Rebate</div>
            <div className="reward-desc">Get a 2% discount on your annual municipal property tax bill.</div>
            <div className="reward-progress"><div className="reward-fill" style={{ width: '15%' }}></div></div>
            <div className="reward-pts">2,340 / 15,000 pts needed</div>
            <button className="btn-outline" style={{ marginTop: '16px', background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'transparent', width: '100%' }} disabled>Not enough points</button>
          </div>

          <div className="dash-card reward-card" style={{ background: 'linear-gradient(135deg,var(--accent),var(--leaf))' }}>
            <div className="reward-title">Govt. Green Certificate</div>
            <div className="reward-desc">Official physical certificate signed by the Mayor, delivered home.</div>
            <div className="reward-progress"><div className="reward-fill" style={{ width: '100%' }}></div></div>
            <div className="reward-pts">2,340 / 1,000 pts needed</div>
            <button className="btn-primary" style={{ marginTop: '16px', width: '100%', background: 'white', color: 'var(--accent)' }} onClick={() => triggerToast('Certificate claimed! Wait 3-5 days for delivery.')}>🎉 Claim Now</button>
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', marginTop: '64px', marginBottom: '24px' }}>Certificate Preview</h3>
        <div className="cert-preview">
          <div className="cert-title">Certificate of Recognition</div>
          <div className="cert-sub">Awarded by the Mira-Bhayandar Municipal Corporation to</div>
          <div className="cert-name">{userName || 'Eco Citizen'}</div>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 32px' }}>
            For outstanding dedication to environmental conservation, actively completing 20+ eco-tasks, and contributing significantly to a greener city.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '4px', fontWeight: 600 }}>14-06-2025</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Date of Issue</div>
            </div>
            <div className="cert-stamp">🏛️</div>
            <div>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '4px', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: '1.2rem' }}>Mayor Sign</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>City Mayor, MBMC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
