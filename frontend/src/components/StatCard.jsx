import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  bgColor = 'bg-primary',
  textColor = 'text-white'
}) => {
  return (
    <div className={`stat-card ${bgColor}`}>
      <div className="stat-icon">
        {Icon && <Icon className={`icon ${textColor}`} />}
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <h4 className="stat-value">{value}</h4>
      </div>
    </div>
  );
};

export default StatCard;
