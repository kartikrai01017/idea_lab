import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TYPE_CONFIG, FEED_MESSAGES } from '../../data/mockData';
import { apiFetch } from '../../api';

import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet icon paths in React with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

const CAT_COLOR = {
  transport: '#3b82f6', waste: '#ec4899', water: '#22d3ee',
  trees: '#22c55e', energy: '#a78bfa', general: '#f59e0b',
};
const CAT_EMOJI = {
  transport: '🚶', waste: '♻️', water: '💧',
  trees: '🌳', energy: '⚡', general: '🌱',
};

const LiveMap = ({ triggerToast }) => {
  const [filter, setFilter] = useState('all');
  const [liveCount, setLiveCount] = useState(47);
  const [realPins, setRealPins] = useState([]);
  const [feed, setFeed] = useState(
    FEED_MESSAGES.slice(0, 5).map(f => ({ ...f, timeStr: 'just now', id: Math.random() }))
  );

  const fetchRealPins = () => {
    apiFetch('/api/map')
      .then(r => r.json())
      .then(data => {
        const pinned = data.filter(d => d.latitude && d.longitude).map(d => ({
          ...d,
          color: CAT_COLOR[d.task_category] || CAT_COLOR.general,
          emoji: CAT_EMOJI[d.task_category] || '🌱',
        }));
        setRealPins(pinned);
        
        if (pinned.length > 0) {
          const latest = pinned[0];
          setFeed(prev => {
            const entry = {
              id: Math.random(),
              text: `${latest.user_name} just submitted ${latest.task_name}`,
              timeStr: 'just now',
              color: latest.color,
            };
            const updated = [entry, ...prev];
            if (updated.length > 5) updated.pop();
            return updated.map((item, i) => i === 0 ? item : { ...item, timeStr: `${i * 2} min ago` });
          });
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchRealPins();
    const realTimer = setInterval(fetchRealPins, 15000);

    let feedIdx = 0;
    const feedTimer = setInterval(() => {
      if (realPins.length > 0) return;
      const msg = FEED_MESSAGES[feedIdx % FEED_MESSAGES.length];
      feedIdx++;
      setFeed(prev => {
        const updated = [{ ...msg, timeStr: 'just now', id: Math.random() }, ...prev];
        if (updated.length > 5) updated.pop();
        return updated.map((item, i) => i > 0 ? { ...item, timeStr: `${i * 2} min ago` } : item);
      });
    }, 4000);

    const countTimer = setInterval(() => {
      setLiveCount(prev => Math.max(40, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 3000);

    return () => { clearInterval(realTimer); clearInterval(feedTimer); clearInterval(countTimer); };
  }, [realPins.length]);

  return (
    <div className="section">
      <div className="section-tag">Live Tracker</div>
      <h2 className="section-title">Real-Time Environmental Map</h2>
      <p className="section-sub">
        Explore live verifiable eco-actions happening right now.
        {realPins.length > 0 && <strong style={{ color: 'var(--accent)' }}> {realPins.length} real citizen pin{realPins.length > 1 ? 's' : ''} on map! 📍</strong>}
      </p>

      {/* CONTROLS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all','tree','recycle','energy','water','cleanup'].map(f => (
            <button key={f} className={`map-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? '🗺️ All' : f === 'tree' ? '🌳 Trees' : f === 'recycle' ? '♻️ Recycling' : f === 'energy' ? '⚡ Energy' : f === 'water' ? '💧 Water' : '🌿 Cleanup'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }}></div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text2)', fontWeight: 600 }}>Live — {liveCount} active now</span>
          {realPins.length > 0 && (
            <span style={{ fontSize: '0.78rem', background: 'var(--accent)', color: 'var(--btn-text)', borderRadius: '50px', padding: '2px 10px', fontWeight: 700 }}>
              🔴 {realPins.length} REAL
            </span>
          )}
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow)', height: '520px', zIndex: 1 }}>
        <MapContainer center={[19.2952, 72.8544]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {realPins.map((pin) => (
            // Only show pins that match the active category filter (if filter !== all)
            // Note: Since realPins use task_category which might not strictly align with the filter names
            // You may want to refine the condition, but for now we'll show all or attempt to filter by text
            (filter === 'all' || pin.task_category.includes(filter) || pin.task_name.toLowerCase().includes(filter)) && (
            <CircleMarker
              key={pin.id}
              center={[pin.latitude, pin.longitude]}
              pathOptions={{ color: '#ffd700', fillColor: pin.color, fillOpacity: 0.8, weight: 2 }}
              radius={8}
            >
              <Popup>
                 <div style={{ color: '#111', fontWeight: 'bold' }}>{pin.emoji} {pin.task_name}</div>
                 <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '4px' }}>
                   <strong>{pin.user_name}</strong> earned +{pin.points_earned} pts<br />
                   <span>{new Date(pin.completed_at).toLocaleString()}</span>
                 </div>
              </Popup>
            </CircleMarker>
            )
          ))}
        </MapContainer>

        {/* FEED OVERLAY */}
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '260px', zIndex: 1000, pointerEvents: 'none' }}>
          <div style={{ background: 'rgba(10,15,25,0.85)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ color: 'white', fontSize: '0.8rem', margin: 0, paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
              Live Activity Feed
            </h4>
            {feed.map(f => (
              <div key={f.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', animation: 'fadeIn 0.5s' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: f.color || (TYPE_CONFIG[f.type] && TYPE_CONFIG[f.type].color) || '#f59e0b', flexShrink: 0 }}></div>
                <div>
                  <div style={{ color: 'white', fontSize: '0.75rem', lineHeight: 1.3 }}>{f.text}</div>
                  <div style={{ color: '#718096', fontSize: '0.65rem' }}>{f.timeStr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
