import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt, FaUsers, FaUserPlus, FaClock,
  FaUmbrellaBeach, FaGraduationCap, FaMoneyBillWave,
  FaFileInvoiceDollar, FaChartLine, FaShieldAlt,
  FaSignOutAlt, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';

const NAV_ITEMS_ADMIN = [
  { path: '/dashboard',   label: 'Dashboard',          icon: FaTachometerAlt },
  { path: '/employees',   label: 'Employees',           icon: FaUsers },
  { path: '/attendance',  label: 'Attendance',          icon: FaClock },
  { path: '/onboarding',  label: 'Onboarding',          icon: FaUserPlus },
  { path: '/leave',       label: 'Leave',               icon: FaUmbrellaBeach },
  { path: '/training',    label: 'Training',            icon: FaGraduationCap },
  { path: '/payroll',     label: 'Payroll',             icon: FaMoneyBillWave },
  { path: '/expense',     label: 'Expense',             icon: FaFileInvoiceDollar },
  { path: '/performance', label: 'Performance',         icon: FaChartLine },
  { path: '/roles',       label: 'Roles & Permissions', icon: FaShieldAlt },
];

const NAV_ITEMS_MANAGER = [
  { path: '/dashboard',   label: 'Dashboard',   icon: FaTachometerAlt },
  { path: '/employees',   label: 'Employees',   icon: FaUsers },
  { path: '/attendance',  label: 'Attendance',  icon: FaClock },
  { path: '/onboarding',  label: 'Onboarding',  icon: FaUserPlus },
  { path: '/training',    label: 'Training',    icon: FaGraduationCap },
  { path: '/performance', label: 'Performance', icon: FaChartLine },
];

const NAV_ITEMS_EMPLOYEE = [
  { path: '/dashboard',  label: 'Dashboard',    icon: FaTachometerAlt },
  { path: '/attendance', label: 'My Attendance', icon: FaClock },
  { path: '/training',   label: 'Training',      icon: FaGraduationCap },
];

const Sidebar = () => {
  const { user, hasRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems =
    hasRole('Admin') || hasRole('HR')
      ? NAV_ITEMS_ADMIN
      : hasRole('Manager')
      ? NAV_ITEMS_MANAGER
      : NAV_ITEMS_EMPLOYEE;

  const initials =
    `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() || 'U';

  return (
    <aside
      className={`
        flex flex-col h-screen sticky top-0 overflow-y-auto overflow-x-hidden
        bg-brand-purple transition-all duration-300 ease-in-out z-40
        ${collapsed ? 'w-[72px]' : 'w-[240px]'}
      `}
      style={{ minWidth: collapsed ? 72 : 240 }}
    >
      {/* ── Logo ─────────────────────────────────── */}
      <div
        className={`
          flex items-center gap-3 px-4 py-5
          border-b border-white/10
          ${collapsed ? 'justify-center' : ''}
        `}
      >
        <div
          className="
            flex-shrink-0 w-9 h-9 rounded-xl
            bg-white/15 flex items-center justify-center
            font-extrabold text-white text-xs tracking-wider
            shadow-brand-sm
          "
        >
          HR
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-extrabold text-sm leading-tight tracking-wide">HRMS</p>
            <p className="text-white/50 text-[10px] leading-tight mt-0.5">Human Resources</p>
          </div>
        )}
      </div>

      {/* ── Collapse toggle ───────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute top-[68px] -right-3 z-50
          w-6 h-6 rounded-full bg-white shadow-brand-sm
          flex items-center justify-center
          text-brand-purple hover:bg-brand-medium hover:text-white
          transition-colors duration-200
          border border-brand-medium/20
        "
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <FaChevronRight size={10} />
          : <FaChevronLeft  size={10} />}
      </button>

      {/* ── Navigation ───────────────────────────── */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 w-full rounded-xl px-3 py-2.5
                text-left transition-all duration-200 group relative
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'}
              `}
            >
              {/* active indicator bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-brand-pink" />
              )}
              <item.icon
                size={16}
                className={`flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-white/50 group-hover:text-white'}`}
              />
              {!collapsed && (
                <span className="text-[13px] font-semibold leading-none">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── User footer ──────────────────────────── */}
      <div className="px-3 py-4 border-t border-white/10">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div
              className="
                flex-shrink-0 w-9 h-9 rounded-full
                bg-brand-medium flex items-center justify-center
                text-white text-[13px] font-bold shadow-brand-sm
              "
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold leading-tight truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/50 text-[11px] mt-0.5 capitalize truncate">
                {String(user?.role || '').replace(/_/g, ' ').toLowerCase()}
              </p>
            </div>
            {logout && (
              <button
                onClick={logout}
                className="text-white/40 hover:text-brand-pink transition-colors"
                title="Logout"
              >
                <FaSignOutAlt size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div
              className="
                w-9 h-9 rounded-full bg-brand-medium
                flex items-center justify-center
                text-white text-[13px] font-bold shadow-brand-sm
              "
            >
              {initials}
            </div>
            {logout && (
              <button
                onClick={logout}
                className="text-white/40 hover:text-brand-pink transition-colors"
                title="Logout"
              >
                <FaSignOutAlt size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;