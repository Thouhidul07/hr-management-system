import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'EMPLOYEE',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const { login, register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }

      const authData = {
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {} : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        }),
      };

      if (isLogin) {
        const result = await login(authData);
        if (result.success) {
          navigate('/dashboard');
        }
      } else {
        const result = await register(authData);
        if (result.success) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: 'EMPLOYEE',
    });
    setFormError(null);
    clearError();
  };

  return (
    <div className="login-container">
      <div className="login-shell">
        <div className="login-hero">
          <div className="login-brand-pill">HR SYSTEM</div>
          <h1>Welcome Back</h1>
          <p>Manage your workforce efficiently with our comprehensive HR Management System.</p>
          <div className="login-feature-list">
            <div className="login-feature-item">
              <span>✓</span> Employee Management
            </div>
            <div className="login-feature-item">
              <span>✓</span> Attendance Tracking
            </div>
            <div className="login-feature-item">
              <span>✓</span> Performance Reviews
            </div>
            <div className="login-feature-item">
              <span>✓</span> Leave Management
            </div>
          </div>
        </div>
        <div className="login-card">
          <Card title={isLogin ? 'Login' : 'Register'}>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="MANAGER">Manager</option>
                      <option value="HR">HR</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {(formError || error) && (
                <div className="alert alert-danger">
                  {formError || error}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
              </button>
            </form>
            <div className="text-center mt-3">
              <button onClick={toggleMode} className="btn btn-link">
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;