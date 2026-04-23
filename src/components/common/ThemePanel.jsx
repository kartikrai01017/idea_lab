import React, { useEffect, useRef } from 'react';

const ThemePanel = ({ show, setShow, currentTheme, setTheme, currentMode, setMode }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && panelRef.current && !panelRef.current.contains(event.target)) {
        // Only close if we didn't click the trigger button
        if (!event.target.closest('.icon-btn')) {
          setShow(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [show, setShow]);

  return (
    <div className={`theme-panel ${show ? 'show' : ''}`} ref={panelRef}>
      <h4>Choose Style</h4>
      <div className="theme-options">
        <div className={`theme-opt ${currentTheme === 'soft' ? 'active' : ''}`} onClick={() => setTheme('soft')}>🌸 Soft & Elegant</div>
        <div className={`theme-opt ${currentTheme === 'normal' ? 'active' : ''}`} onClick={() => setTheme('normal')}>🌿 Normalize</div>
        <div className={`theme-opt ${currentTheme === 'anime' ? 'active' : ''}`} onClick={() => setTheme('anime')}>⚡ Anime Style</div>
      </div>
      <h4>Mode</h4>
      <div className="mode-toggle">
        <button className={`mode-btn ${currentMode === 'light' ? 'active' : ''}`} onClick={() => setMode('light')}>☀️ Light</button>
        <button className={`mode-btn ${currentMode === 'dark' ? 'active' : ''}`} onClick={() => setMode('dark')}>🌙 Dark</button>
      </div>
    </div>
  );
};

export default ThemePanel;
