import React, { useEffect, useState } from 'react';

const FraudBar = ({ msg, show, onClose, userPoints, strikes }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [width, setWidth] = useState('100%');

  useEffect(() => {
    if (show) {
      setTimeLeft(5);
      setWidth('100%');
      setTimeout(() => setWidth('0%'), 50);

      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [show, onClose]);

  const isSuspended = userPoints < -500 || strikes >= 3;

  return (
    <div 
      id="fraudBar" 
      className={show ? 'show' : ''} 
      style={isSuspended ? {
        background: 'linear-gradient(90deg,#3a0050,#6a0080,#3a0050)',
        borderBottomColor: '#cc00ff'
      } : {}}
    >
      <span className="fraud-icon">🚫</span>
      <div className="fraud-msg">{msg}</div>
      <div className="fraud-timer">Closing in {timeLeft}s</div>
      <button className="fraud-close" onClick={onClose}>✕</button>
      <div className="fraud-progress" style={{ width, transition: 'width 5s linear' }}></div>
    </div>
  );
};

export default FraudBar;
