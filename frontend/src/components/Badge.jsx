import React from 'react';
import '../styles/Badge.css';

const Badge = ({ label, variant = 'primary', size = 'md' }) => {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {label}
    </span>
  );
};

export default Badge;
