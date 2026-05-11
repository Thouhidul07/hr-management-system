import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeesAPI, attendanceAPI } from '../services/api';
import {
  FaUsers, FaUserCheck, FaUserTimes, FaClipboardList,
  FaUserPlus, FaArrowRight, FaCircle,
  FaChevronLeft, FaChevronRight, FaSearch,
} from 'react-icons/fa';

/* ─── Stat Card ────────────────────────────────────────────── */
const StatCard = ({ title, value, subtitle, icon: Icon, color, bg, ring }) => (
  <div className={`
    relative overflow-hidden rounded-2xl bg-white border
    ${ring} shadow-sm hover:shadow-brand-md hover:-translate-y-1
    transition-all duration-300 p-5 group
  `}>
    {/* Decorative blob */}
    <div className={`
      absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10
      ${bg} transition-all duration-300 group-hover:scale-125
    `} />

    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{title}</p>
        <p className="text-brand-midnight font-extrabold text-3xl leading-none">{value}</p>
        {subtitle && (
          <p className="text-gray-400 text-xs mt-2 leading-snug">{subtitle}</p>
        )}
      </div>
      <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${bg} flex items-center justify-center shadow-sm`}>
        <Icon size={20} className={color} />
      </div>
    </div>
  </div>
);

/* ─── Status Badge ─────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    Active:   { cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',   dot: 'bg-emerald-500' },
    Inactive: { cls: 'bg-gray-50 text-gray-500 border-gray-200',            dot: 'bg-gray-400' },
    Pending:  { cls: 'bg-orange-50 text-orange-600 border-orange-200',      dot: 'bg-brand-orange' },
    'On Leave': { cls: 'bg-purple-50 text-purple-600 border-purple-200',    dot: 'bg-brand-medium' },
  };
  const s = map[status] ?? map['Inactive'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${s.cls}`}>
      <FaCircle size={5} className={s.dot} />
      {status}
    </span>
  );
};

/* ─── Mock fallback employees ──────────────────────────────── */
const MOCK_EMPLOYEES = [
  { id: 1, firstName: 'Sarah',   lastName: 'Kim',      email: 'sarah.kim@hrms.io',      department: 'Engineering',    position: 'Sr. Engineer',     status: 'Active',   hireDate: '2022-03-14' },
  { id: 2, firstName: 'James',   lastName: 'Okafor',   email: 'j.okafor@hrms.io',       department: 'Marketing',      position: 'Brand Manager',    status: 'Active',   hireDate: '2021-07-01' },
  { id: 3, firstName: 'Priya',   lastName: 'Nair',     email: 'priya.n@hrms.io',        department: 'HR',             position: 'HR Specialist',    status: 'On Leave', hireDate: '2023-01-20' },
  { id: 4, firstName: 'Carlos',  lastName: 'Mendes',   email: 'c.mendes@hrms.io',       department: 'Finance',        position: 'Financial Analyst',status: 'Active',   hireDate: '2020-11-05' },
  { id: 5, firstName: 'Aiko',    lastName: 'Tanaka',   email: 'a.tanaka@hrms.io',       department: 'Product',        position: 'Product Lead',     status: 'Pending',  hireDate: '2024-02-10' },
  { id: 6, firstName: 'Lena',    lastName: 'Fischer',  email: 'l.fischer@hrms.io',      department: 'Design',         position: 'UX Designer',      status: 'Active',   hireDate: '2022-09-22' },
  { id: 7, firstName: 'David',   lastName: 'Park',     email: 'd.park@hrms.io',         department: 'Engineering',    position: 'DevOps Engineer',  status: 'Active',   hireDate: '2023-06-18' },
  { id: 8, firstName: 'Amara',   lastName: 'Diallo',   email: 'a.diallo@hrms.io',       department: 'Operations',     position: 'Ops Manager',      status: 'Inactive', hireDate: '2019-04-30' },
];

const DEPT_COLORS = {
  Engineering:  'bg-blue-100   text-blue-700',
  Marketing:    'bg-pink-100   text-pink-700',
  HR:           'bg-purple-100 text-purple-700',
  Finance:      'bg-green-100  text-green-700',
  Product:      'bg-orange-100 text-orange-700',
  Design:       'bg-teal-100   text-teal-700',
  Operations:   'bg-yellow-100 text-yellow-700',
};

const deptColor = (dept) => DEPT_COLORS[dept] ?? 'bg-gray-100 text-gray-600';

const avatarGradients = [
  'from-brand-purple to-brand-medium',
  'from-brand-pink to-rose-400',
  'from-brand-orange to-yellow-400',
  'from-teal-500 to-cyan-400',
  'from-blue-500 to-indigo-500',
];

/* ─── Dashboard Component ──────────────────────────────────── */
const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalEmployees: 0, presentToday: 0, absentToday: 0, pendingTasks: 0 });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 7;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // Stats
        try {
          const empStats = await employeesAPI.getStats();
          const today = new Date().toISOString().split('T')[0];
          const attRes = await attendanceAPI.getAll({ date: today, limit: 1000 });
          const recs = attRes.data || [];
          setStats({
            totalEmployees: empStats.data?.totalEmployees ?? 0,
            presentToday:   recs.filter(r => r.status === 'Present').length,
            absentToday:    recs.filter(r => r.status === 'Absent').length,
            pendingTasks:   0,
          });
        } catch { /* backend offline — skip */ }

        // Employee list
        try {
          const empRes = await employeesAPI.getAll({ page: 1, limit: 50 });
          const list = empRes.data?.employees ?? [];
          setEmployees(list.length > 0 ? list : MOCK_EMPLOYEES);
        } catch {
          setEmployees(MOCK_EMPLOYEES);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    return (
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
      (e.email ?? '').toLowerCase().includes(q) ||
      (e.department ?? '').toLowerCase().includes(q) ||
      (e.position ?? '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statCards = [
    {
      title: 'Total Employees',
      value: loading ? '—' : stats.totalEmployees || employees.length,
      subtitle: 'All active staff members',
      icon: FaUsers,
      color: 'text-brand-purple',
      bg:    'bg-brand-purple/10',
      ring:  'border-brand-purple/20',
    },
    {
      title: 'Present Today',
      value: loading ? '—' : stats.presentToday,
      subtitle: 'Checked in this morning',
      icon: FaUserCheck,
      color: 'text-emerald-600',
      bg:    'bg-emerald-50',
      ring:  'border-emerald-200',
    },
    {
      title: 'Absent Today',
      value: loading ? '—' : stats.absentToday,
      subtitle: 'Not checked in today',
      icon: FaUserTimes,
      color: 'text-brand-pink',
      bg:    'bg-brand-pink/10',
      ring:  'border-brand-pink/20',
    },
    {
      title: 'Pending Tasks',
      value: loading ? '—' : stats.pendingTasks,
      subtitle: 'Onboarding & approvals',
      icon: FaClipboardList,
      color: 'text-brand-orange',
      bg:    'bg-brand-orange/10',
      ring:  'border-brand-orange/20',
    },
  ];

  const recentActivity = [
    { text: 'Sarah Kim submitted a leave request',    time: '10 min ago', dot: 'bg-brand-pink' },
    { text: 'Payroll for May 2026 was processed',     time: '1 hr ago',   dot: 'bg-brand-medium' },
    { text: 'Carlos Mendes completed onboarding',     time: '3 hr ago',   dot: 'bg-emerald-500' },
    { text: 'New hire offer sent to Lena Fischer',    time: 'Yesterday',  dot: 'bg-brand-orange' },
    { text: 'Performance review cycle started',       time: '2 days ago', dot: 'bg-brand-purple' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">

      {/* ── Welcome banner ──────────────────────────────── */}
      <div className="
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-brand-purple via-[#6B48A8] to-brand-medium
        p-6 text-white shadow-brand-lg
      ">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/5" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold leading-tight">
              Welcome back 👋
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Here's what's happening with your team today.
            </p>
          </div>
          <button
            onClick={() => navigate('/employees')}
            className="
              inline-flex items-center gap-2 self-start sm:self-auto
              px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25
              text-white text-sm font-semibold
              border border-white/20 backdrop-blur-sm
              transition-all duration-200
            "
          >
            <FaUserPlus size={13} />
            Add Employee
          </button>
        </div>
      </div>

      {/* ── Staffing Overview ───────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-brand-midnight font-bold text-base">Staffing Overview</h2>
          <button
            onClick={() => navigate('/attendance')}
            className="flex items-center gap-1.5 text-brand-medium text-sm font-semibold hover:text-brand-purple transition-colors"
          >
            View attendance <FaArrowRight size={11} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* ── Main grid: Table + Activity ─────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Employee Directory ─────────────────────────── */}
        <section className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-brand-midnight font-bold text-sm">Employee Directory</h3>
                <p className="text-gray-400 text-xs mt-0.5">{filtered.length} records</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="
                  flex items-center gap-2 bg-[#F9FAFB] border border-gray-200
                  rounded-xl px-3 py-2 focus-within:border-brand-medium focus-within:ring-2
                  focus-within:ring-brand-medium/20 transition-all
                ">
                  <FaSearch size={11} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search…"
                    className="bg-transparent text-xs text-brand-midnight placeholder-gray-400 outline-none w-32"
                  />
                </div>
                {/* Add Employee */}
                <button
                  onClick={() => navigate('/employees')}
                  className="
                    flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white
                    bg-brand-pink shadow-pink-sm hover:shadow-md hover:-translate-y-0.5
                    transition-all duration-200
                  "
                >
                  <FaUserPlus size={11} />
                  Add Employee
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-gray-100">
                    {['Employee', 'Department', 'Position', 'Status', 'Joined'].map(h => (
                      <th key={h} className="
                        px-5 py-3 text-left text-[11px] font-bold text-gray-400
                        uppercase tracking-wider whitespace-nowrap
                      ">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                        No employees found.
                      </td>
                    </tr>
                  ) : paginated.map((emp, idx) => {
                    const grad = avatarGradients[idx % avatarGradients.length];
                    const joinDate = emp.hireDate
                      ? new Date(emp.hireDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—';
                    return (
                      <tr
                        key={emp.id}
                        className="hover:bg-[#FAFAFF] transition-colors duration-150 cursor-pointer"
                        onClick={() => navigate('/employees')}
                      >
                        {/* Name + avatar */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`
                              flex-shrink-0 w-8 h-8 rounded-full
                              bg-gradient-to-br ${grad}
                              flex items-center justify-center
                              text-white text-[11px] font-bold shadow-sm
                            `}>
                              {emp.firstName?.[0]}{emp.lastName?.[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="text-brand-midnight text-[13px] font-semibold leading-tight truncate">
                                {emp.firstName} {emp.lastName}
                              </p>
                              <p className="text-gray-400 text-[11px] truncate">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        {/* Department */}
                        <td className="px-5 py-3.5">
                          <span className={`
                            inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold
                            ${deptColor(emp.department)}
                          `}>
                            {emp.department || '—'}
                          </span>
                        </td>
                        {/* Position */}
                        <td className="px-5 py-3.5">
                          <p className="text-gray-600 text-[13px] truncate max-w-[140px]">
                            {emp.position || '—'}
                          </p>
                        </td>
                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <StatusBadge status={emp.status || 'Active'} />
                        </td>
                        {/* Join date */}
                        <td className="px-5 py-3.5">
                          <p className="text-gray-400 text-[12px] whitespace-nowrap">{joinDate}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-[#FAFAFA]">
              <p className="text-gray-400 text-xs">
                Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="
                    w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center
                    text-gray-500 hover:text-brand-purple hover:border-brand-medium/40
                    disabled:opacity-40 disabled:cursor-not-allowed transition-all
                  "
                >
                  <FaChevronLeft size={10} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`
                      w-7 h-7 rounded-lg text-xs font-semibold transition-all
                      ${p === page
                        ? 'bg-brand-purple text-white shadow-brand-sm'
                        : 'border border-gray-200 text-gray-500 hover:text-brand-purple hover:border-brand-medium/40'}
                    `}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="
                    w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center
                    text-gray-500 hover:text-brand-purple hover:border-brand-medium/40
                    disabled:opacity-40 disabled:cursor-not-allowed transition-all
                  "
                >
                  <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Recent Activity ────────────────────────────── */}
        <section className="xl:col-span-1 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-brand-midnight font-bold text-sm">Recent Activity</h3>
              <p className="text-gray-400 text-xs mt-0.5">Latest team updates</p>
            </div>
            <ul className="divide-y divide-gray-50 flex-1">
              {recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#F9FAFB] transition-colors">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${a.dot}`} />
                  <div>
                    <p className="text-brand-midnight text-[12px] font-medium leading-snug">{a.text}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick stats donut-style card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-brand-midnight font-bold text-sm mb-4">Department Breakdown</h3>
            <div className="flex flex-col gap-3">
              {[
                { dept: 'Engineering', pct: 32, color: 'bg-brand-purple' },
                { dept: 'Marketing',   pct: 18, color: 'bg-brand-pink' },
                { dept: 'Finance',     pct: 14, color: 'bg-emerald-500' },
                { dept: 'Product',     pct: 20, color: 'bg-brand-orange' },
                { dept: 'HR & Ops',    pct: 16, color: 'bg-brand-medium' },
              ].map(({ dept, pct, color }) => (
                <div key={dept}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[12px] text-gray-600 font-medium">{dept}</span>
                    <span className="text-[12px] text-brand-midnight font-bold">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;