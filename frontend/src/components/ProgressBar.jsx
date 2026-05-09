import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ value, max = 100, label, color = 'primary', showLabel = true }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-wrapper">
      {showLabel && label && <p className="progress-label">{label}</p>}
      <div className="progress-bar-container">
        <div 
          className={`progress-bar-fill progress-${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && <p className="progress-value">{percentage.toFixed(0)}%</p>}
    </div>
  );
};

export default ProgressBar;
