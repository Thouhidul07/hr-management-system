const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required in backend/.env');
}

const parsedUrl = new URL(databaseUrl);
const connectionConfig = {
  host: parsedUrl.hostname,
  port: parsedUrl.port ? Number(parsedUrl.port) : 3306,
  user: decodeURIComponent(parsedUrl.username),
  password: decodeURIComponent(parsedUrl.password),
  database: parsedUrl.pathname.replace(/^\//, ''),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: false,
};

let pool;

const getBootstrapConnection = async () => {
  return mysql.createConnection({
    host: connectionConfig.host,
    port: connectionConfig.port,
    user: connectionConfig.user,
    password: connectionConfig.password,
  });
};

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool(connectionConfig);
  }

  return pool;
};

const query = async (sql, params = []) => {
  const [rows] = await getPool().execute(sql, params);
  return rows;
};

const createSchema = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS departments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      managerId INT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      passwordHash VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      role ENUM('ADMIN', 'HR', 'MANAGER', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE',
      departmentId INT NULL,
      position VARCHAR(255) NULL,
      hireDate DATETIME NULL,
      status ENUM('ACTIVE', 'INACTIVE', 'ON_LEAVE') NOT NULL DEFAULT 'ACTIVE',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL UNIQUE,
      employeeId VARCHAR(64) NOT NULL UNIQUE,
      reportingManagerId INT NULL,
      jobTitle VARCHAR(255) NULL,
      salary DECIMAL(10,2) NULL,
      bankAccountNumber VARCHAR(255) NULL,
      taxId VARCHAR(255) NULL,
      emergencyContactName VARCHAR(255) NULL,
      emergencyContactPhone VARCHAR(255) NULL,
      emergencyContactRelation VARCHAR(255) NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS onboarding_tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      dueDate DATETIME NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      assignedTo INT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS offboarding_processes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employeeId INT NOT NULL,
      lastDay DATETIME NOT NULL,
      reason VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'active',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employeeId INT NOT NULL,
      date DATE NOT NULL,
      checkIn DATETIME NULL,
      checkOut DATETIME NULL,
      breakDuration INT NOT NULL DEFAULT 0,
      status ENUM('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'LEAVE') NOT NULL DEFAULT 'PRESENT',
      notes TEXT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_employee_date (employeeId, date)
    )
  `);
};

const seedDefaultData = async () => {
  const departments = [
    ['Human Resources', 'Handles all HR-related functions'],
    ['Engineering', 'Software development and technical support'],
    ['Marketing', 'Marketing and sales activities'],
    ['Finance', 'Financial planning and accounting'],
  ];

  for (const [name, description] of departments) {
    await query(
      `INSERT INTO departments (name, description)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE description = VALUES(description)`,
      [name, description]
    );
  }

  const hashedPassword = await bcrypt.hash('password123', 10);
  const departmentRows = await query('SELECT id, name FROM departments ORDER BY id ASC');
  const departmentMap = new Map(departmentRows.map((department) => [department.name, department.id]));

  const users = [
    { email: 'admin@hrms.com', firstName: 'Admin', lastName: 'User', role: 'ADMIN', departmentId: null, position: 'System Administrator' },
    { email: 'hr@hrms.com', firstName: 'HR', lastName: 'Manager', role: 'HR', departmentId: departmentMap.get('Human Resources'), position: 'HR Manager' },
    { email: 'manager@hrms.com', firstName: 'John', lastName: 'Doe', role: 'MANAGER', departmentId: departmentMap.get('Engineering'), position: 'Engineering Manager' },
    { email: 'employee@hrms.com', firstName: 'Jane', lastName: 'Smith', role: 'EMPLOYEE', departmentId: departmentMap.get('Engineering'), position: 'Software Developer' },
  ];

  for (const user of users) {
    const existingUsers = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [user.email]);

    let userId;

    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
      await query(
        `UPDATE users
         SET passwordHash = ?,
             firstName = ?,
             lastName = ?,
             role = ?,
             departmentId = ?,
             position = ?
         WHERE id = ?`,
        [hashedPassword, user.firstName, user.lastName, user.role, user.departmentId, user.position, userId]
      );
    } else {
      const insertResult = await query(
        'INSERT INTO users (email, passwordHash, firstName, lastName, role, departmentId, position) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.email, hashedPassword, user.firstName, user.lastName, user.role, user.departmentId, user.position]
      );
      userId = insertResult.insertId;
    }

    const existingEmployee = await query('SELECT id FROM employees WHERE userId = ? LIMIT 1', [userId]);
    if (existingEmployee.length === 0) {
      const employeeId = user.role === 'ADMIN' ? 'EMP001' : `EMP${String(userId).padStart(3, '0')}`;
      await query(
        'INSERT INTO employees (userId, employeeId, reportingManagerId, jobTitle, salary) VALUES (?, ?, ?, ?, ?)',
        [
          userId,
          employeeId,
          user.role === 'EMPLOYEE' ? 3 : 1,
          user.position,
          user.role === 'HR' ? 75000 : user.role === 'MANAGER' ? 90000 : 60000,
        ]
      );
    }
  }
};

const initDatabase = async () => {
  const bootstrapConnection = await getBootstrapConnection();

  await bootstrapConnection.query(`CREATE DATABASE IF NOT EXISTS \`${connectionConfig.database}\``);
  await bootstrapConnection.end();

  await createSchema();
  await seedDefaultData();
};

module.exports = {
  getPool,
  query,
  initDatabase,
};
