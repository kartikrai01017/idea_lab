import React from 'react';

const FabGroup = ({ onTipClick, onHelpClick }) => {
  return (
    <div className="fab-group">
      <div className="fab fab-tip" onClick={onTipClick} title="Eco Tip">💡</div>
      <div className="fab fab-help" onClick={onHelpClick} title="Help">❓</div>
    </div>
  );
};

export default FabGroup;
