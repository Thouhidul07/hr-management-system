import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    ];

    // Admin and HR can access all features
    if (hasRole('Admin') || hasRole('HR')) {
      return [
        ...baseItems,
        { path: '/employees', label: 'Employees', icon: '👥' },
        { path: '/attendance', label: 'Attendance', icon: '📅' },
        { path: '/onboarding', label: 'Onboarding', icon: '🚀' },
        { path: '/leave', label: 'Leave', icon: '🏖️' },
      ];
    }

    // Managers can access most features except leave
    if (hasRole('Manager')) {
      return [
        ...baseItems,
        { path: '/employees', label: 'Employees', icon: '👥' },
        { path: '/attendance', label: 'Attendance', icon: '📅' },
        { path: '/onboarding', label: 'Onboarding', icon: '🚀' },
      ];
    }

    // Employees can only access dashboard and their own attendance
    if (hasRole('Employee')) {
      return [
        ...baseItems,
        { path: '/attendance', label: 'My Attendance', icon: '📅' },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>HRMS</h2>
        <span>Human Resource Management</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="user-details">
            <div className="user-name">{user?.firstName} {user?.lastName}</div>
            <div className="user-role">{user?.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;