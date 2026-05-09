import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaBell, FaChevronDown, FaMoon, FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/employees': 'Employee Management',
    '/attendance': 'Attendance Management',
    '/onboarding': 'Onboarding',
    '/leave': 'Leave Management',
    '/training': 'Training & Development',
    '/payroll': 'Payroll',
    '/expense': 'Expense',
    '/performance': 'Performance',
    '/roles': 'Roles & Permissions',
  };

  return (
    <nav className="navbar">
      <button className="navbar-menu-btn" type="button" aria-label="Open navigation">
        <FaBars />
      </button>

      <div className="navbar-title-wrap">
        <h1>{pageTitles[location.pathname] || 'HR Management System'}</h1>
        <p>Manage people, attendance, payroll, and performance in one place.</p>
      </div>

      <div className="navbar-search">
        <FaSearch className="navbar-search-icon" />
        <input type="text" placeholder="Search employees, documents..." aria-label="Search" />
      </div>

      <div className="navbar-actions">
        <button className="navbar-action-btn" type="button" aria-label="Toggle theme">
          <FaMoon />
        </button>
        <button className="navbar-action-btn" type="button" aria-label="Notifications">
          <FaBell />
          <span className="navbar-notification-dot" />
        </button>
      </div>
      
      <div className="navbar-user">
        <div className="navbar-avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
        <div className="user-info">
          <span className="user-name">{user?.firstName} {user?.lastName}</span>
          <span className="user-role">{String(user?.role || '').replace(/_/g, ' ').toLowerCase()}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout <FaChevronDown />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;