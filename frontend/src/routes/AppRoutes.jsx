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
import '../styles/App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="unauthorized-container">
        <h1>Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
        <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard'}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return children;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

// Login Page Wrapper
const LoginPage = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  
  return <Login />;
};

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Navigate to="/dashboard" />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/employees" element={
              <ProtectedRoute requiredRole="HR">
                <Layout>
                  <Employees />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/attendance" element={
              <ProtectedRoute requiredRole="Manager">
                <Layout>
                  <Attendance />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/onboarding" element={
              <ProtectedRoute requiredRole="HR">
                <Layout>
                  <Onboarding />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/leave" element={
              <ProtectedRoute requiredRole="HR">
                <Layout>
                  <Leave />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/training" element={
              <ProtectedRoute>
                <Layout>
                  <Training />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/payroll" element={
              <ProtectedRoute requiredRole="HR">
                <Layout>
                  <Payroll />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/expense" element={
              <ProtectedRoute>
                <Layout>
                  <Expense />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/performance" element={
              <ProtectedRoute>
                <Layout>
                  <Performance />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path="/roles" element={
              <ProtectedRoute requiredRole="ADMIN">
                <Layout>
                  <Roles />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={
              <ProtectedRoute>
                <Layout>
                  <div className="not-found">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;