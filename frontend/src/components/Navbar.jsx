import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaSearch, FaBell, FaCog, FaChevronDown,
  FaUserCircle, FaSignOutAlt, FaMoon,
} from 'react-icons/fa';

const PAGE_TITLES = {
  '/dashboard':   'Dashboard',
  '/employees':   'Employee Management',
  '/attendance':  'Attendance Tracking',
  '/onboarding':  'Onboarding',
  '/leave':       'Leave Management',
  '/training':    'Training',
  '/payroll':     'Payroll',
  '/expense':     'Expense Reports',
  '/performance': 'Performance',
  '/roles':       'Roles & Permissions',
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const dropRef = useRef(null);
  const notifRef = useRef(null);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'HR Management';
  const initials =
    `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() || 'U';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notifications = [
    { id: 1, text: 'New leave request from Sarah K.', time: '5m ago', dot: 'bg-brand-pink' },
    { id: 2, text: 'Payroll processed for May 2026',  time: '1h ago', dot: 'bg-brand-medium' },
    { id: 3, text: 'Onboarding task pending review',  time: '3h ago', dot: 'bg-brand-orange' },
  ];

  return (
    <header className="
      sticky top-0 z-30 flex items-center gap-4
      bg-white/90 backdrop-blur-md
      border-b border-gray-100
      px-6 py-3 h-[64px] shadow-sm
    ">
      {/* ── Page title ─────────────────────────── */}
      <div className="flex-1 min-w-0">
        <h1 className="text-brand-midnight font-bold text-lg leading-tight truncate">
          {pageTitle}
        </h1>
        <p className="text-gray-400 text-xs mt-0.5 hidden sm:block">{today}</p>
      </div>

      {/* ── Search bar ─────────────────────────── */}
      <div className="
        hidden md:flex items-center gap-2
        bg-[#F9FAFB] border border-gray-200 rounded-xl
        px-3 py-2 w-64 xl:w-80
        focus-within:border-brand-medium focus-within:ring-2 focus-within:ring-brand-medium/20
        transition-all duration-200
      ">
        <FaSearch size={13} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search employees, records…"
          className="
            bg-transparent flex-1 text-sm text-brand-midnight
            placeholder-gray-400 outline-none min-w-0
          "
        />
      </div>

      {/* ── Notifications ──────────────────────── */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
          className="
            relative w-9 h-9 rounded-xl bg-[#F9FAFB] border border-gray-200
            flex items-center justify-center
            text-gray-500 hover:text-brand-purple hover:border-brand-medium/40
            transition-all duration-200
          "
        >
          <FaBell size={15} />
          <span className="
            absolute top-1.5 right-1.5 w-2 h-2 rounded-full
            bg-brand-pink border border-white
          " />
        </button>

        {notifOpen && (
          <div className="
            absolute right-0 top-12 w-80 z-50
            bg-white rounded-2xl shadow-brand-md border border-gray-100
            animate-slide-down overflow-hidden
          ">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-brand-midnight text-sm">Notifications</span>
              <span className="text-xs text-brand-medium font-semibold cursor-pointer hover:underline">
                Mark all read
              </span>
            </div>
            <ul className="divide-y divide-gray-50">
              {notifications.map((n) => (
                <li key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-[13px] text-brand-midnight font-medium leading-snug">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-2.5 border-t border-gray-100 text-center">
              <button className="text-xs text-brand-medium font-semibold hover:underline">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Profile dropdown ───────────────────── */}
      <div className="relative" ref={dropRef}>
        <button
          onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
          className="
            flex items-center gap-2.5 rounded-xl
            border border-gray-200 bg-[#F9FAFB]
            px-3 py-2 hover:border-brand-medium/40
            transition-all duration-200
          "
        >
          <div className="
            w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple to-brand-medium
            flex items-center justify-center text-white text-[11px] font-bold
            shadow-brand-sm
          ">
            {initials}
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-brand-midnight font-semibold text-[12px]">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-400 text-[10px] capitalize">
              {String(user?.role || '').replace(/_/g, ' ').toLowerCase()}
            </p>
          </div>
          <FaChevronDown
            size={10}
            className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {dropdownOpen && (
          <div className="
            absolute right-0 top-12 w-52 z-50
            bg-white rounded-2xl shadow-brand-md border border-gray-100
            animate-slide-down overflow-hidden
          ">
            <div className="px-4 py-3 border-b border-gray-100 bg-[#F9FAFB]">
              <p className="font-bold text-brand-midnight text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{user?.email}</p>
            </div>
            <ul className="py-1">
              {[
                { icon: FaUserCircle, label: 'My Profile',   onClick: () => {} },
                { icon: FaCog,        label: 'Settings',     onClick: () => {} },
                { icon: FaMoon,       label: 'Preferences',  onClick: () => {} },
              ].map(({ icon: Icon, label, onClick }) => (
                <li key={label}>
                  <button
                    onClick={() => { onClick(); setDropdownOpen(false); }}
                    className="
                      w-full flex items-center gap-3 px-4 py-2.5
                      text-[13px] text-gray-600 hover:bg-[#F9FAFB] hover:text-brand-purple
                      transition-colors duration-150
                    "
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => { logout?.(); setDropdownOpen(false); }}
                className="
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-[13px] text-brand-pink hover:bg-rose-50
                  transition-colors duration-150 font-semibold
                "
              >
                <FaSignOutAlt size={13} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;