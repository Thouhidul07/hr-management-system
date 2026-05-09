const { verifyToken } = require('../config/jwt');
const { query } = require('../config/db');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);

    const rows = await query(
      `SELECT u.*, d.name AS departmentName, d.description AS departmentDescription
       FROM users u
       LEFT JOIN departments d ON d.id = u.departmentId
       WHERE u.id = ?
       LIMIT 1`,
      [decoded.id]
    );

    const row = rows[0];
    const user = row ? {
      id: row.id,
      email: row.email,
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
    } : null;

    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Access denied. Authentication required.' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

module.exports = { authenticate, authorize };