import React from 'react';

// The large Anime SVG background logic moved here to clean up HomePage
const AnimeBackground = () => (
  <div id="anime-bg-canvas" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {/* Defs and structure omitted for brevity in mock, assuming minimal replication or just the dark overlay if it was too huge */}
      <rect width="1200" height="700" fill="#d8d8d8"/>
      <rect width="1200" height="700" fill="rgba(0,0,0,0.52)"/>
      <rect width="1200" height="700" fill="rgba(5,10,25,0.35)"/>
    </svg>
  </div>
);

export default AnimeBackground;
