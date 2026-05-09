const { query } = require('../config/db');

const getDepartments = async (req, res) => {
  try {
    const rows = await query('SELECT id, name FROM departments ORDER BY id ASC');
    res.json({ departments: rows });
  } catch (error) {
    console.error('Failed to fetch departments', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

module.exports = {
  getDepartments,
};
