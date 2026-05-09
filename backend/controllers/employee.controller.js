const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getEmployeeStats } = require('../services/employee.service');

const getAllEmployeesController = async (req, res) => {
  try {
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      department: req.query.department,
      status: req.query.status
    };
    
    const result = await getAllEmployees(filters);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeByIdController = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    res.json({ employee });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createEmployeeController = async (req, res) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).json({
      message: 'Employee created successfully',
      employee
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEmployeeController = async (req, res) => {
  try {
    const employee = await updateEmployee(req.params.id, req.body);
    res.json({
      message: 'Employee updated successfully',
      employee
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEmployeeController = async (req, res) => {
  try {
    const result = await deleteEmployee(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getEmployeeStatsController = async (req, res) => {
  try {
    const stats = await getEmployeeStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployeesController,
  getEmployeeByIdController,
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getEmployeeStatsController
};