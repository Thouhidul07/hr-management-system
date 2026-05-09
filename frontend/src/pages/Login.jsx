import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import { FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
import '../styles/Login.css';
import { departmentsAPI } from '../services/api';
import { useEffect } from 'react';

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
  const { login, register, error } = useAuth();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData);
        if (result.success) {
          navigate('/dashboard');
        }
      } else {
        // Basic client-side confirm password check
        if (formData.password !== formData.confirmPassword) {
          setLoading(false);
          return alert('Passwords do not match');
        }

        const payload = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          departmentId: formData.departmentId || null,
        };

        const result = await register(payload);
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

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const res = await departmentsAPI.getAll();
        setDepartments(res.data.departments || []);
      } catch (err) {
        console.warn('Failed to load departments', err);
      }
    };

    if (!isLogin) {
      loadDepartments();
    }
  }, [isLogin]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '', role: 'EMPLOYEE' });
  };

  return (
    <div className="login-container">
      <div className="login-shell">
        <div className="login-hero">
          <div className="login-brand-pill">HRMS</div>
          <h1>HR management, made clean and calm.</h1>
          <p>
            Sign in to manage employees, attendance, payroll, leave, and training from one polished workspace.
          </p>

          <div className="login-feature-list">
            <div className="login-feature-item">
              <FaShieldAlt /> Secure access for every role
            </div>
            <div className="login-feature-item">
              <FaUsers /> Staff, attendance, and onboarding in one place
            </div>
            <div className="login-feature-item">
              <FaChartLine /> Clear dashboards with live operational data
            </div>
          </div>
        </div>

        <div className="login-card">
          <Card title={isLogin ? 'Welcome back' : 'Create your account'}>
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
                  placeholder="admin@hrms.com"
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
                  placeholder="password123"
                  required
                />
              </div>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Register as</label>
                    <select
                      id="role"
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="HR">HR</option>
                      <option value="MANAGER">Manager</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="departmentId" className="form-label">Department (optional)</label>
                    <select
                      id="departmentId"
                      name="departmentId"
                      className="form-select"
                      value={formData.departmentId || ''}
                      onChange={handleChange}
                    >
                      <option value="">-- Select department --</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
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
                      value={formData.confirmPassword || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Register')}
              </button>
            </form>
            <div className="text-center mt-3">
              <button onClick={toggleMode} className="btn btn-link login-toggle-btn">
                {isLogin ? 'Need an account? Switch to register' : 'Already have an account? Switch to login'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;