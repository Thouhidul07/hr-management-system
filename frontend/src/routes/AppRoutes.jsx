import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Attendance from '../pages/Attendance';
import Onboarding from '../pages/Onboarding';
import Leave from '../pages/Leave';
import Training from '../pages/Training';
import Payroll from '../pages/Payroll';
import Expense from '../pages/Expense';
import Performance from '../pages/Performance';
import Roles from '../pages/Roles';

/* ── Protected Route ────────────────────────────────── */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-brand-medium border-t-brand-purple animate-spin" />
          <p className="text-brand-medium text-sm font-medium">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-bg p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-pink/10 flex items-center justify-center">
          <span className="text-3xl">🔒</span>
        </div>
        <h1 className="text-2xl font-extrabold text-brand-midnight">Unauthorized</h1>
        <p className="text-gray-500 max-w-xs">You don't have permission to access this page.</p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="
            mt-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
            bg-gradient-to-br from-brand-purple to-brand-medium
            shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5
            transition-all duration-200
          "
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return children;
};

/* ── App Layout ─────────────────────────────────────── */
const Layout = ({ children }) => (
  <div className="flex h-screen overflow-hidden bg-brand-bg">
    <Sidebar />
    <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
      <Navbar />
      <main className="flex-1 p-6 md:p-8 animate-fade-in">
        {children}
      </main>
    </div>
  </div>
);

/* ── Login wrapper (redirect if authed) ─────────────── */
const LoginPage = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;
  return <Login />;
};

/* ── Spinner fallback ───────────────────────────────── */
const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-bg">
    <div className="w-10 h-10 rounded-full border-4 border-brand-medium border-t-brand-purple animate-spin" />
  </div>
);

/* ── Routes ─────────────────────────────────────────── */
const AppRoutes = () => (
  <Router>
    <AuthProvider>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
          <Route path="/" element={
            <ProtectedRoute><Layout><Navigate to="/dashboard" /></Layout></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute requiredRole="HR"><Layout><Employees /></Layout></ProtectedRoute>
          } />
          <Route path="/attendance" element={
            <ProtectedRoute requiredRole="Manager"><Layout><Attendance /></Layout></ProtectedRoute>
          } />
          <Route path="/onboarding" element={
            <ProtectedRoute requiredRole="HR"><Layout><Onboarding /></Layout></ProtectedRoute>
          } />
          <Route path="/leave" element={
            <ProtectedRoute requiredRole="HR"><Layout><Leave /></Layout></ProtectedRoute>
          } />
          <Route path="/training" element={
            <ProtectedRoute><Layout><Training /></Layout></ProtectedRoute>
          } />
          <Route path="/payroll" element={
            <ProtectedRoute requiredRole="HR"><Layout><Payroll /></Layout></ProtectedRoute>
          } />
          <Route path="/expense" element={
            <ProtectedRoute><Layout><Expense /></Layout></ProtectedRoute>
          } />
          <Route path="/performance" element={
            <ProtectedRoute><Layout><Performance /></Layout></ProtectedRoute>
          } />
          <Route path="/roles" element={
            <ProtectedRoute requiredRole="ADMIN"><Layout><Roles /></Layout></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <ProtectedRoute>
              <Layout>
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-24">
                  <p className="text-7xl font-extrabold text-brand-purple/20">404</p>
                  <h2 className="text-2xl font-bold text-brand-midnight">Page Not Found</h2>
                  <p className="text-gray-400 max-w-xs">The page you're looking for doesn't exist.</p>
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="
                      mt-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
                      bg-gradient-to-br from-brand-purple to-brand-medium shadow-brand-sm
                      hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200
                    "
                  >
                    Back to Dashboard
                  </button>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </AuthProvider>
  </Router>
);

export default AppRoutes;