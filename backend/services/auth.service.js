const bcrypt = require('bcryptjs');
const { prisma } = require('../config/db');
const { generateToken } = require('../config/jwt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const register = async (userData) => {
  const { email, password, firstName, lastName, role, departmentId, position, hireDate } = userData;
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // Hash password
  const passwordHash = await hashPassword(password);
  
  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      departmentId: departmentId ? parseInt(departmentId) : null,
      position,
      hireDate: hireDate ? new Date(hireDate) : null
    },
    include: {
      department: true
    }
  });
  
  // Create employee record if role is not ADMIN
  if (role !== 'ADMIN') {
    const employeeId = `EMP${Date.now()}`;
    
    await prisma.employee.create({
      data: {
        userId: user.id,
        employeeId,
        reportingManagerId: null // Will be set later
      }
    });
  }
  
  // Generate token
  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  
  return { user, token };
};

const login = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      department: true
    }
  });
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password
  const isPasswordValid = await comparePassword(password, user.passwordHash);
  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  // Generate token
  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  
  return { user, token };
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      department: true,
      employee: true
    }
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

const updateProfile = async (userId, updateData) => {
  const { firstName, lastName, position, departmentId } = updateData;
  
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      position,
      departmentId: departmentId ? parseInt(departmentId) : null
    },
    include: {
      department: true
    }
  });
  
  return user;
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};