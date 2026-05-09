const bcrypt = require('bcryptjs');
const { query } = require('../config/db');
const { generateToken } = require('../config/jwt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const mapUserRow = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    firstName: row.firstName,
    lastName: row.lastName,
    role: row.role,
    departmentId: row.departmentId,
    position: row.position,
    hireDate: row.hireDate,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    department: row.departmentId ? {
      id: row.departmentId,
      name: row.departmentName,
      description: row.departmentDescription,
    } : null,
    employee: row.employeeId ? {
      id: row.employeeDbId,
      employeeId: row.employeeId,
      reportingManagerId: row.reportingManagerId,
      jobTitle: row.jobTitle,
      salary: row.salary,
    } : null,
  };
};

const getUserByEmail = async (email) => {
  const rows = await query(
    `SELECT
      u.*,
      d.name AS departmentName,
      d.description AS departmentDescription,
      e.id AS employeeDbId,
      e.employeeId,
      e.reportingManagerId,
      e.jobTitle,
      e.salary
    FROM users u
    LEFT JOIN departments d ON d.id = u.departmentId
    LEFT JOIN employees e ON e.userId = u.id
    WHERE u.email = ?
    LIMIT 1`,
    [email]
  );

  return mapUserRow(rows[0]);
};

const getUserById = async (id) => {
  const rows = await query(
    `SELECT
      u.*,
      d.name AS departmentName,
      d.description AS departmentDescription,
      e.id AS employeeDbId,
      e.employeeId,
      e.reportingManagerId,
      e.jobTitle,
      e.salary
    FROM users u
    LEFT JOIN departments d ON d.id = u.departmentId
    LEFT JOIN employees e ON e.userId = u.id
    WHERE u.id = ?
    LIMIT 1`,
    [id]
  );

  return mapUserRow(rows[0]);
};

const register = async (userData) => {
  const { email, password, firstName, lastName, role, departmentId, position, hireDate } = userData;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const passwordHash = await hashPassword(password);

  // Default role to EMPLOYEE when not provided
  const userRole = role || 'EMPLOYEE';

  const insertResult = await query(
    `INSERT INTO users (email, passwordHash, firstName, lastName, role, departmentId, position, hireDate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      email,
      passwordHash,
      firstName,
      lastName,
      userRole,
      departmentId ? parseInt(departmentId, 10) : null,
      position || null,
      hireDate ? new Date(hireDate) : null,
    ]
  );

  const userId = insertResult.insertId;

  if (userRole !== 'ADMIN') {
    const employeeId = `EMP${Date.now()}`;

    await query(
      `INSERT INTO employees (userId, employeeId, reportingManagerId, jobTitle)
       VALUES (?, ?, ?, ?)`,
      [userId, employeeId, null, position || null]
    );
  }

  const user = await getUserById(userId);
  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
};

const getProfile = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateProfile = async (userId, updateData) => {
  const { firstName, lastName, position, departmentId } = updateData;

  await query(
    `UPDATE users
     SET firstName = COALESCE(?, firstName),
         lastName = COALESCE(?, lastName),
         position = COALESCE(?, position),
         departmentId = COALESCE(?, departmentId)
     WHERE id = ?`,
    [
      firstName || null,
      lastName || null,
      position || null,
      departmentId ? parseInt(departmentId, 10) : null,
      userId,
    ]
  );

  const user = await getUserById(userId);

  return user;
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};