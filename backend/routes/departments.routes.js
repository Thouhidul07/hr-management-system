const express = require('express');
const router = express.Router();
const { getDepartments } = require('../controllers/department.controller');

router.get('/', getDepartments);

module.exports = router;
