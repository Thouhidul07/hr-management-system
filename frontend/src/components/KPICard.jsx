import React from 'react';
import '../styles/KPICard.css';

const KPICard = ({ title, value, change, icon: Icon, trend = 'up', color = 'primary' }) => {
  return (
    <div className={`kpi-card kpi-${color}`}>
      <div className="kpi-header">
        <h3 className="kpi-title">{title}</h3>
        {Icon && <Icon className="kpi-icon" />}
      </div>
      <div className="kpi-content">
        <h2 className="kpi-value">{value}</h2>
        {change && (
          <span className={`kpi-change trend-${trend}`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default KPICard;
