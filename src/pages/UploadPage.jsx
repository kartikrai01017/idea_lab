import React, { useState, useEffect, useRef } from 'react';

// Generates a code string once per component load
const genCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = 'ECO-';
  for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
  c += '-';
  for (let i = 0; i < 3; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
};

const UploadPage = ({ triggerToast, onFraudDetected, onUploadSuccess }) => {
  const [taskType, setTaskType] = useState('fitness');
  const [SESSION_CODE] = useState(genCode());
  const canvasRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [geoStatus, setGeoStatus] = useState('idle'); // idle | locating | granted | denied
  const [coords, setCoords] = useState(null);

  const [uploadState, setUploadState] = useState({ taskDone: true, proofDone: false, qrDone: false });
  const [scanSteps, setScanSteps] = useState(null);
  const [scanIdx, setScanIdx] = useState(0);
  const [result, setResult] = useState(null);

  // Capture geolocation silently on mount
  useEffect(() => {
    if (navigator.geolocation) {
      setGeoStatus('locating');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGeoStatus('granted');
        },
        () => setGeoStatus('denied'),
        { timeout: 6000 }
      );
    } else {
      setGeoStatus('denied');
    }
  }, []);

  // Draw QR code
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 120, 120);
      ctx.fillStyle = '#000';
      for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
          if (Math.random() > 0.5) ctx.fillRect(col * 8, row * 8, 7, 7);
        }
      }
      [[0, 0], [0, 96], [96, 0]].forEach(([x, y]) => {
        ctx.fillRect(x, y, 24, 24); ctx.fillStyle = '#fff'; ctx.fillRect(x + 3, y + 3, 18, 18);
        ctx.fillStyle = '#000'; ctx.fillRect(x + 6, y + 6, 12, 12);
      });
    }
  }, [taskType]);

  const runAnimation = (steps, onDone) => {
    setResult(null);
    setScanSteps(steps);
    setScanIdx(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) setScanIdx(i);
      if (i >= steps.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setScanSteps(null);
          onDone();
        }, 600);
      }
    }, 700);
  };

  const showResult = (pass, title, text) => {
    setResult({ pass, title, text });
    if (!pass && onFraudDetected) {
      onFraudDetected(taskType);
    }
  };

  const simulateGPS = () => {
    setUploadState({ taskDone: true, proofDone: false, qrDone: false });
    runAnimation([
      '📂 Reading GPX file...', '📍 Extracting GPS...', '🗺️ Validating boundary...', '⏱️ Checking timestamp...', '✅ Route validated!'
    ], () => {
      const pass = Math.random() > 0.15;
      showResult(pass, pass ? 'GPS Verified ✅' : 'Failed ⚠️', pass ? 'GPX route fits area.' : 'Too few points.');
      if (pass) setUploadState(s => ({ ...s, proofDone: true, qrDone: true }));
    });
  };

  const simulatePhoto = () => {
    setUploadState({ taskDone: true, proofDone: false, qrDone: false });
    runAnimation([
      '📷 Live camera...', '🔐 Detecting QR...', '👤 Face match...', '✅ Complete!'
    ], () => {
      const pass = Math.random() > 0.2;
      showResult(pass, pass ? 'Verified ✅' : 'Failed ⚠️', pass ? 'QR code matches.' : 'QR missing in frame.');
      if (pass) setUploadState(s => ({ ...s, proofDone: true, qrDone: true }));
    });
  };

  const simulateVideo = () => {
    setUploadState({ taskDone: true, proofDone: false, qrDone: false });
    runAnimation([
      '🎥 Live camera...', '🔐 Code...', '🎬 Checking cuts...', '✅ Complete!'
    ], () => {
      const pass = Math.random() > 0.2;
      showResult(pass, pass ? 'Verified ✅' : 'Failed ⚠️', pass ? 'Continuous recording ok.' : 'Duplicate video hash.');
      if (pass) setUploadState(s => ({ ...s, proofDone: true, qrDone: true }));
    });
  };

  const simulateGroup = () => {
    setUploadState({ taskDone: true, proofDone: false, qrDone: false });
    runAnimation([
      '📍 Recording GPS...', '👥 Event ID...', '🕐 Cross-referencing...', '✅ Verified!'
    ], () => {
      const pass = Math.random() > 0.15;
      showResult(pass, pass ? 'Verified ✅' : 'Failed ⚠️', pass ? '7 participants verified here.' : 'GPS farming alert.');
      if (pass) setUploadState(s => ({ ...s, proofDone: true, qrDone: true }));
    });
  };

  const submitProof = async () => {
    if (!uploadState.proofDone || !uploadState.qrDone) {
      triggerToast('⚠️ Please complete verification first!'); return;
    }
    
    // Map taskType to a human-readable task name & category
    const taskMeta = {
      fitness: { name: 'Walk / Cycle', category: 'transport' },
      photo:   { name: 'Photo Proof', category: 'general' },
      video:   { name: 'Live Video Action', category: 'general' },
      group:   { name: 'Group Cleanup', category: 'waste' },
    };
    const meta = taskMeta[taskType] || { name: 'Eco Task', category: 'general' };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/tasks/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          taskType,
          passed: result?.pass,
          task_name: meta.name,
          task_category: meta.category,
          latitude: coords?.lat || null,
          longitude: coords?.lng || null,
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 401) { triggerToast('⚠️ Please login first.'); return; }
        throw new Error(data.error || 'Server error');
      }

      if (data.success) {
        triggerToast(`🎉 Proof submitted! +${data.pointsAdded} EcoPoints! 📍 Your pin is on the map!`);
        if (onUploadSuccess) onUploadSuccess();
      } else {
        triggerToast(`⚠️ Fraud detected. -${data.pointsDeducted} EcoPoints!`);
      }

    } catch (err) {
      console.error(err);
      triggerToast('⚠️ Network Error. Is the server running?');
    }

    setUploadState({ taskDone: true, proofDone: false, qrDone: false });
    setResult(null);
  };

  return (
    <div className="page active fade-in" id="page-upload" style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>Secure Proof Upload</h2>
      <p className="section-sub" style={{ textAlign: 'center' }}>AI verification prevents fraud and ensures authentic eco-actions.</p>

      {/* Geolocation Status Pill */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        {geoStatus === 'locating' && <span style={{ fontSize: '0.8rem', color: 'var(--text2)', padding: '4px 12px', background: 'var(--bg3)', borderRadius: '50px', border: '1px solid var(--border)' }}>📍 Getting your location for the map...</span>}
        {geoStatus === 'granted' && <span style={{ fontSize: '0.8rem', color: 'var(--accent)', padding: '4px 12px', background: 'rgba(74,124,89,0.08)', borderRadius: '50px', border: '1px solid var(--accent)' }}>📍 Location captured — your pin will appear on the live map!</span>}
        {geoStatus === 'denied' && <span style={{ fontSize: '0.8rem', color: 'var(--text2)', padding: '4px 12px', background: 'var(--bg3)', borderRadius: '50px', border: '1px solid var(--border)' }}>📍 Location not shared — proof still accepted, no map pin</span>}
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', justifyContent: 'center' }}>
        <button className={`task-select-btn ${taskType === 'fitness' ? 'active' : ''}`} onClick={() => { setTaskType('fitness'); setUploadState({ taskDone: true, proofDone: false, qrDone: false }); setResult(null); }}>🏃 GPS / Distance Tracking</button>
        <button className={`task-select-btn ${taskType === 'photo' ? 'active' : ''}`} onClick={() => { setTaskType('photo'); setUploadState({ taskDone: true, proofDone: false, qrDone: false }); setResult(null); }}>📸 Still Photo Proof</button>
        <button className={`task-select-btn ${taskType === 'video' ? 'active' : ''}`} onClick={() => { setTaskType('video'); setUploadState({ taskDone: true, proofDone: false, qrDone: false }); setResult(null); }}>🎥 Live Action Video</button>
        <button className={`task-select-btn ${taskType === 'group' ? 'active' : ''}`} onClick={() => { setTaskType('group'); setUploadState({ taskDone: true, proofDone: false, qrDone: false }); setResult(null); }}>👥 Group Task / Cleanup</button>
      </div>

      <div className="check-grid">
        <div className={`check-item done`}>✅ Task selected</div>
        <div className={`check-item ${uploadState.proofDone ? 'done' : ''}`}>{uploadState.proofDone ? '✅ Proof uploaded' : '⬜ Proof uploaded'}</div>
        <div className={`check-item ${uploadState.qrDone ? 'done' : ''}`}>{uploadState.qrDone ? '✅ QR / GPS verified' : '⬜ QR / GPS verified'}</div>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '32px', boxShadow: 'var(--shadow)' }}>
        
        {taskType === 'fitness' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: '16px' }}>🏃 Walk/Cycle Proof</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '24px' }}>Upload a GPX file exported from Strava, Google Fit, or Garmin. We verify the time, distance, and boundary coordinates.</p>
            <div className={`upload-zone ${scanSteps ? 'drag-over' : ''}`} onClick={simulateGPS}>
              {scanSteps ? (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div className="scan-line" style={{ position: 'relative', width: '100%', height: '2px', background: 'linear-gradient(90deg,transparent,var(--accent),transparent)', animation: 'scan 1s ease-in-out infinite', marginBottom: '16px' }}></div>
                  <span style={{ fontSize: '1.5rem' }}>🔍</span>
                  <p style={{ color: 'var(--text2)', fontSize: '0.83rem', marginTop: '8px' }}>{scanSteps[scanIdx]}</p>
                </div>
              ) : (
                <>
                  <span className="upload-icon">📄</span>
                  <p style={{ fontWeight: 600 }}>Click to select GPX tracking file</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Simulates GPS validation logic.</p>
                </>
              )}
            </div>
          </div>
        )}

        {taskType === 'photo' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: '16px' }}>📸 Live Photo Verification</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '16px' }}>Write today's session code on a piece of paper and include it in your photo. This ensures the photo is taken today by you.</p>
                <div style={{ background: 'var(--bg3)', borderRadius: '8px', padding: '12px', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <canvas ref={canvasRef} width="120" height="120" style={{ width: '60px', height: '60px', borderRadius: '4px' }}></canvas>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Session Code</div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '1.2rem', color: 'var(--accent)', letterSpacing: '2px' }}>{SESSION_CODE}</div>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div className={`upload-zone ${scanSteps ? 'drag-over' : ''}`} onClick={simulatePhoto} style={{ padding: '30px' }}>
                  {scanSteps ? (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <div className="scan-line" style={{ position: 'relative', width: '100%', height: '2px', background: 'linear-gradient(90deg,transparent,var(--accent),transparent)', animation: 'scan 1s ease-in-out infinite', marginBottom: '16px' }}></div>
                      <span style={{ fontSize: '1.5rem' }}>🔍</span>
                      <p style={{ color: 'var(--text2)', fontSize: '0.83rem', marginTop: '8px' }}>{scanSteps[scanIdx]}</p>
                    </div>
                  ) : (
                    <>
                      <span className="upload-icon">📷</span>
                      <p style={{ fontWeight: 600 }}>Take Live Photo</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Opens camera. Ensure code is visible.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {taskType === 'video' && (
          <div>
             <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: '16px' }}>🎥 Live Video Validation</h3>
             <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '24px' }}>Start a live recording. Show your face, then verbally say or show the code <strong>{SESSION_CODE}</strong>, followed by panning to the eco-task.</p>
             <div className={`upload-zone ${scanSteps ? 'drag-over' : ''}`} onClick={simulateVideo}>
              {scanSteps ? (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div className="scan-line" style={{ position: 'relative', width: '100%', height: '2px', background: 'linear-gradient(90deg,transparent,var(--accent),transparent)', animation: 'scan 1s ease-in-out infinite', marginBottom: '16px' }}></div>
                  <span style={{ fontSize: '1.5rem' }}>🔍</span>
                  <p style={{ color: 'var(--text2)', fontSize: '0.83rem', marginTop: '8px' }}>{scanSteps[scanIdx]}</p>
                </div>
              ) : (
                <>
                  <span className="upload-icon">🔴</span>
                  <p style={{ fontWeight: 600 }}>Start Live Video Recording</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>15 sec limit. No uploads from gallery allowed.</p>
                </>
              )}
             </div>
          </div>
        )}

        {taskType === 'group' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: '16px' }}>👥 Group / Cleanup Check-In</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '24px' }}>Click to check-in via GPS if you are attending an official municipality event.</p>
            <div className={`upload-zone ${scanSteps ? 'drag-over' : ''}`} onClick={simulateGroup}>
              {scanSteps ? (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div className="scan-line" style={{ position: 'relative', width: '100%', height: '2px', background: 'linear-gradient(90deg,transparent,var(--accent),transparent)', animation: 'scan 1s ease-in-out infinite', marginBottom: '16px' }}></div>
                  <span style={{ fontSize: '1.5rem' }}>🔍</span>
                  <p style={{ color: 'var(--text2)', fontSize: '0.83rem', marginTop: '8px' }}>{scanSteps[scanIdx]}</p>
                </div>
              ) : (
                <>
                  <span className="upload-icon">📍</span>
                  <p style={{ fontWeight: 600 }}>Record Location & Verify</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Click to sync GPS with active event zones.</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* RESULT AREA */}
        {result && (
          <div className={`ai-scan-result show ${result.pass ? 'authentic' : 'suspicious'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.3rem' }}>{result.pass ? '✅' : '⚠️'}</span>
              <strong style={{ color: 'var(--text)' }}>{result.title}</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>{result.text}</p>
          </div>
        )}

      </div>

      <button className="btn-primary" style={{ width: '100%', marginTop: '20px', padding: '16px', fontSize: '1.1rem' }} onClick={submitProof}>
        ✅ Submit Evidence for Review
      </button>

    </div>
  );
};

export default UploadPage;
