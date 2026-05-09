import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaClock,
  FaUmbrellaBeach,
  FaGraduationCap,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaChartLine,
  FaShieldAlt,
} from 'react-icons/fa';
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
      { path: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    ];

    // Admin and HR can access all features
    if (hasRole('Admin') || hasRole('HR')) {
      return [
        ...baseItems,
        { path: '/employees', label: 'Employees', icon: FaUsers },
        { path: '/attendance', label: 'Attendance', icon: FaClock },
        { path: '/onboarding', label: 'Onboarding', icon: FaUserPlus },
        { path: '/leave', label: 'Leave', icon: FaUmbrellaBeach },
        { path: '/training', label: 'Training', icon: FaGraduationCap },
        { path: '/payroll', label: 'Payroll', icon: FaMoneyBillWave },
        { path: '/expense', label: 'Expense', icon: FaFileInvoiceDollar },
        { path: '/performance', label: 'Performance', icon: FaChartLine },
        { path: '/roles', label: 'Roles & Permissions', icon: FaShieldAlt },
      ];
    }

    // Managers can access most features except leave
    if (hasRole('Manager')) {
      return [
        ...baseItems,
        { path: '/employees', label: 'Employees', icon: FaUsers },
        { path: '/attendance', label: 'Attendance', icon: FaClock },
        { path: '/onboarding', label: 'Onboarding', icon: FaUserPlus },
        { path: '/training', label: 'Training', icon: FaGraduationCap },
        { path: '/performance', label: 'Performance', icon: FaChartLine },
      ];
    }

    // Employees can only access dashboard and their own attendance
    if (hasRole('Employee')) {
      return [
        ...baseItems,
        { path: '/attendance', label: 'My Attendance', icon: FaClock },
        { path: '/training', label: 'Training', icon: FaGraduationCap },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand-mark">HRMS</div>
        <div className="sidebar-brand-copy">
          <h2>HRMS</h2>
          <span>Human Resource Management</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon"><item.icon /></span>
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
            <div className="user-role">{String(user?.role || '').replace(/_/g, ' ').toLowerCase()}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;