import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaUserPlus,
  FaPlaneDeparture,
  FaSignOutAlt,
} from 'react-icons/fa';

import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <FaTachometerAlt />,
    },
    {
      path: '/employees',
      label: 'Employees',
      icon: <FaUsers />,
    },
    {
      path: '/attendance',
      label: 'Attendance',
      icon: <FaCalendarCheck />,
    },
    {
      path: '/onboarding',
      label: 'Onboarding',
      icon: <FaUserPlus />,
    },
    {
      path: '/leave',
      label: 'Leave',
      icon: <FaPlaneDeparture />,
    },
  ];

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-brand">
        <h1>
          <span>HR</span>Space
        </h1>
      </div>

      {/* CENTER */}

      {/* RIGHT */}
      <div className="navbar-user">
        <div className="user-avatar">
          {user?.firstName?.charAt(0)}
        </div>

        <div className="user-info">
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>

          <span className="user-role">
            {user?.role}
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;