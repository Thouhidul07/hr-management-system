import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaUserTie,
} from 'react-icons/fa';
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
  const [localError, setLocalError] = useState(null);

  const { login, register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData);

        if (result.success) {
          navigate('/dashboard');
        }
      } else {
        if (formData.password.length < 6) {
          setLocalError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setLocalError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await register(formData);

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

    setLocalError(null);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Logo */}
        <div className="logo-section">
          <h1 className="logo-text">
            <span>HR</span>Space
          </h1>
          <div className="logo-line"></div>
        </div>

        {/* Card */}
        <div className="glass-card">
          <h2 className="login-title">
            {isLogin ? 'Login to Your Account' : 'Create Your Account'}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="input-group-custom">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group-custom">
              <FaLock className="input-icon" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Register Fields */}
            {!isLogin && (
              <>
                <div className="input-group-custom">
                  <FaUser className="input-icon" />

                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group-custom">
                  <FaUser className="input-icon" />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group-custom">
                  <FaUserTie className="input-icon" />

                  <select
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

                <div className="input-group-custom">
                  <FaLock className="input-icon" />

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Error */}
            {(localError || error) && (
              <div className="error-box">
                {localError || error}
              </div>
            )}

            {/* Remember + Forgot */}
            {isLogin && (
              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? 'Loading...'
                : isLogin
                ? 'Login'
                : 'Register'}
            </button>
          </form>

          {/* Toggle */}
          <div className="bottom-text">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              onClick={toggleMode}
              className="switch-btn"
            >
              {isLogin ? 'Register Here' : 'Login Here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;