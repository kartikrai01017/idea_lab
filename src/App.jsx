import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import ThemePanel from './components/common/ThemePanel';
import FabGroup from './components/common/FabGroup';
import FraudBar from './components/common/FraudBar';
import HelpModal from './components/common/HelpModal';
import PremiumModal from './components/common/PremiumModal';
import TipBox from './components/common/TipBox';
import Toast from './components/common/Toast';
import { TIPS } from './data/mockData';

// Pages
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import DashboardPage from './pages/DashboardPage';
import AchievementsPage from './pages/AchievementsPage';
import RewardsPage from './pages/RewardsPage';
import AuthPage from './pages/AuthPage';
import { apiFetch } from './api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('soft');
  const [currentMode, setCurrentMode] = useState('light');
  
  // Modal/UI States
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [tipData, setTipData] = useState(TIPS[0]);
  
  // Notification States
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Game States
  const [userPoints, setUserPoints] = useState(0);
  const [fraudStrikes, setFraudStrikes] = useState(0);
  const [fraudBarOpts, setFraudBarOpts] = useState({ show: false, msg: '' });
  const [userName, setUserName] = useState('');
  const [userStreak, setUserStreak] = useState(0);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await apiFetch('/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserPoints(data.points);
        setFraudStrikes(data.strikes);
        setUserName(data.name);
        setUserStreak(data.current_streak);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  const popTip = () => {
    setTipData(TIPS[Math.floor(Math.random() * TIPS.length)]);
    setShowTip(true);
  };

  const handleFraud = (taskType) => {
    const deduction = taskType === 'fitness' ? 150 : taskType === 'video' ? 120 : 100;
    const remaining = userPoints - deduction;
    let msg;
    if (fraudStrikes >= 2) {
      msg = `🚫 Strike ${fraudStrikes + 1}/3 — Fake proof detected again. ${deduction} EcoPoints deducted. One more strike = account suspended.`;
    } else if (remaining < 0) {
      msg = `🚫 Fake proof detected — ${deduction} pts deducted. Balance negative: account suspended & reported to MBMC.`;
    } else {
      msg = `🚫 Fake proof detected — ${deduction} EcoPoints deducted (Strike ${fraudStrikes + 1}/3). Remaining: ${remaining} pts. Repeated violations = account suspension.`;
    }
    setUserPoints(remaining);
    setFraudStrikes(s => s + 1);
    setFraudBarOpts({ show: true, msg });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', currentMode);
  }, [currentTheme, currentMode]);

  const toggleMode = () => {
    setCurrentMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        setShowThemePanel={setShowThemePanel} 
        toggleMode={toggleMode} 
        isDarkMode={currentMode === 'dark'}
        setShowPremium={setShowPremium} 
        userStreak={userStreak}
      />
      
      {/* Modals & Overlays */}
      <ThemePanel 
        show={showThemePanel} setShow={setShowThemePanel} 
        currentTheme={currentTheme} setTheme={setCurrentTheme} 
        currentMode={currentMode} setMode={setCurrentMode} 
      />
      
      <FraudBar 
        show={fraudBarOpts.show} msg={fraudBarOpts.msg} strikes={fraudStrikes} userPoints={userPoints}
        onClose={() => setFraudBarOpts({ show: false, msg: '' })} 
      />
      <TipBox tip={tipData} show={showTip} onClose={() => setShowTip(false)} />
      <Toast msg={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
      <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
      <PremiumModal show={showPremium} onClose={() => setShowPremium(false)} triggerToast={triggerToast} />
      <FabGroup onTipClick={popTip} onHelpClick={() => setShowHelp(true)} />

      <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} triggerToast={triggerToast} />}
        {currentPage === 'tasks' && <TasksPage triggerToast={triggerToast} />}
        {currentPage === 'dashboard' && <DashboardPage userPoints={userPoints} userName={userName} userStreak={userStreak} />}
        {currentPage === 'achievements' && <AchievementsPage />}
        {currentPage === 'rewards' && <RewardsPage triggerToast={triggerToast} userName={userName} />}
        {currentPage === 'upload' && <UploadPage triggerToast={triggerToast} onFraudDetected={handleFraud} onUploadSuccess={fetchUserProfile} />}
        {currentPage === 'login' && <AuthPage setCurrentPage={setCurrentPage} triggerToast={triggerToast} onLoginSuccess={fetchUserProfile} />}
      </main>

      <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
