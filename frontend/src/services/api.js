import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Departments API
export const departmentsAPI = {
  getAll: () => api.get('/departments'),
};

// Employees API
export const employeesAPI = {
  getAll: (params = {}) => api.get('/employees', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (employeeData) => api.post('/employees', employeeData),
  update: (id, employeeData) => api.put(`/employees/${id}`, employeeData),
  delete: (id) => api.delete(`/employees/${id}`),
  getStats: () => api.get('/employees/stats'),
};

// Onboarding API
export const onboardingAPI = {
  getTasks: (params = {}) => api.get('/onboarding/tasks', { params }),
  getTaskById: (id) => api.get(`/onboarding/tasks/${id}`),
  createTask: (taskData) => api.post('/onboarding/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/onboarding/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/onboarding/tasks/${id}`),
  getTasksByEmployee: (employeeId) => api.get(`/onboarding/tasks/employee/${employeeId}`),
  getOffboarding: (params = {}) => api.get('/onboarding/offboarding', { params }),
  createOffboarding: (offboardingData) => api.post('/onboarding/offboarding', offboardingData),
  updateOffboarding: (id, offboardingData) => api.put(`/onboarding/offboarding/${id}`, offboardingData),
  deleteOffboarding: (id) => api.delete(`/onboarding/offboarding/${id}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params = {}) => api.get('/attendance', { params }),
  getById: (id) => api.get(`/attendance/${id}`),
  clockIn: (data) => api.post('/attendance/clock-in', data),
  clockOut: (data) => api.post('/attendance/clock-out', data),
  update: (id, attendanceData) => api.put(`/attendance/${id}`, attendanceData),
  delete: (id) => api.delete(`/attendance/${id}`),
  getReport: (params = {}) => api.get('/attendance/report', { params }),
  getStats: () => api.get('/attendance/stats'),
};

// Helper functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const setUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const hasRole = (requiredRole) => {
  const user = getUser();
  if (!user) return false;
  
  // Role hierarchy: Admin > HR > Manager > Employee
  const roleHierarchy = {
    'ADMIN': 4,
    'HR': 3,
    'MANAGER': 2,
    'EMPLOYEE': 1
  };

  const normalizeRole = (role) => String(role || '').trim().toUpperCase();
  return (roleHierarchy[normalizeRole(user.role)] || 0) >= (roleHierarchy[normalizeRole(requiredRole)] || 0);
};

export default api;