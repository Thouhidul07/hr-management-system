import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';

const FEATURES = [
  { icon: '👥', label: 'Employee Management' },
  { icon: '⏰', label: 'Attendance Tracking' },
  { icon: '📊', label: 'Performance Reviews' },
  { icon: '🌴', label: 'Leave Management' },
];

const Field = ({ id, label, type, name, value, onChange, icon: Icon, extra }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-brand-midnight text-[13px] font-semibold">
        {label}
      </label>
      <div className="
        flex items-center gap-2.5 bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2.5
        focus-within:border-brand-medium focus-within:ring-2 focus-within:ring-brand-medium/20
        transition-all duration-200
      ">
        <Icon size={14} className="text-gray-400 flex-shrink-0" />
        <input
          id={id} name={name}
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          required
          {...extra}
          className="flex-1 bg-transparent text-brand-midnight text-sm placeholder-gray-400 outline-none"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="text-gray-400 hover:text-brand-medium transition-colors">
            {show ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
          </button>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', role: 'EMPLOYEE',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const { login, register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        ...(!isLogin && { firstName: formData.firstName, lastName: formData.lastName, role: formData.role }),
      };
      const result = isLogin ? await login(authData) : await register(authData);
      if (result.success) navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '', role: 'EMPLOYEE' });
    setFormError(null);
    clearError();
  };

  return (
    <div className="min-h-screen flex bg-brand-bg">
      {/* ── Left hero panel ─────────────────────────── */}
      <div className="
        hidden lg:flex flex-col justify-center px-14 xl:px-20
        bg-gradient-to-br from-brand-purple via-[#6B48A8] to-brand-medium
        lg:w-[45%] relative overflow-hidden
      ">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center font-extrabold text-white text-sm shadow-brand-sm">
              HR
            </div>
            <div>
              <p className="text-white font-extrabold text-base tracking-wide leading-none">HRMS</p>
              <p className="text-white/50 text-[11px] mt-0.5">Human Resources</p>
            </div>
          </div>

          <h1 className="text-white text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
            Manage your<br />workforce<br />
            <span className="text-brand-pink">effortlessly.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-sm">
            A comprehensive HR platform to streamline employees, attendance, payroll and performance.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <span className="text-xl">{icon}</span>
                <span className="text-white/80 text-[13px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-brand-purple flex items-center justify-center font-extrabold text-white text-sm">
              HR
            </div>
            <p className="text-brand-midnight font-extrabold text-base">HRMS</p>
          </div>

          <h2 className="text-brand-midnight font-extrabold text-2xl mb-1">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="text-gray-400 text-sm mb-7">
            {isLogin
              ? 'Enter your credentials to access the dashboard.'
              : 'Fill in the details below to get started.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Register-only fields */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <Field id="firstName" label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} icon={FaUser} />
                <Field id="lastName"  label="Last Name"  type="text" name="lastName"  value={formData.lastName}  onChange={handleChange} icon={FaUser} />
              </div>
            )}

            <Field id="email"    label="Email"    type="email"    name="email"    value={formData.email}    onChange={handleChange} icon={FaEnvelope} />
            <Field id="password" label="Password" type="password" name="password" value={formData.password} onChange={handleChange} icon={FaLock} />

            {!isLogin && (
              <>
                <Field id="confirmPassword" label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} icon={FaLock} />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="text-brand-midnight text-[13px] font-semibold">Role</label>
                  <div className="flex items-center gap-2.5 bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-brand-medium focus-within:ring-2 focus-within:ring-brand-medium/20 transition-all">
                    <FaShieldAlt size={14} className="text-gray-400 flex-shrink-0" />
                    <select
                      id="role" name="role"
                      value={formData.role} onChange={handleChange}
                      className="flex-1 bg-transparent text-brand-midnight text-sm outline-none cursor-pointer"
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="MANAGER">Manager</option>
                      <option value="HR">HR</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Error */}
            {(formError || error) && (
              <div className="bg-rose-50 border border-rose-200 text-brand-pink rounded-xl px-4 py-3 text-sm font-medium">
                {formError || error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-1 w-full py-3 rounded-xl text-white font-bold text-sm
                bg-gradient-to-br from-brand-purple to-brand-medium
                shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                transition-all duration-200 flex items-center justify-center gap-2
              "
            >
              {loading && (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {loading ? 'Please wait…' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button onClick={toggleMode} className="text-brand-medium text-sm font-semibold hover:text-brand-purple hover:underline transition-colors">
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;