import React, { useEffect } from 'react';

const Toast = ({ msg, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div id="toast" className={show ? 'show' : ''}>
      {msg}
    </div>
  );
};

export default Toast;
