import React from 'react';
import '../styles/Card.css';

const PageCard = ({ title, children, footer, className = '', actions = null }) => {
  return (
    <div className={`page-card ${className}`}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default PageCard;
