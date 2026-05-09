const { 
  getAllOnboardingTasks, 
  getOnboardingTaskById, 
  createOnboardingTask, 
  updateOnboardingTask, 
  deleteOnboardingTask, 
  getOnboardingTasksByEmployee,
  getOnboardingStats,
  getAllOffboardingProcesses,
  getOffboardingProcessById,
  createOffboardingProcess,
  updateOffboardingProcess,
  deleteOffboardingProcess
} = require('../services/onboarding.service');

const getAllOnboardingTasksController = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      assignedTo: req.query.assignedTo,
      page: req.query.page,
      limit: req.query.limit
    };
    
    const result = await getAllOnboardingTasks(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOnboardingTaskByIdController = async (req, res) => {
  try {
    const task = await getOnboardingTaskById(req.params.id);
    res.json({ task });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createOnboardingTaskController = async (req, res) => {
  try {
    const task = await createOnboardingTask(req.body);
    res.status(201).json({
      message: 'Onboarding task created successfully',
      task
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOnboardingTaskController = async (req, res) => {
  try {
    const task = await updateOnboardingTask(req.params.id, req.body);
    res.json({
      message: 'Onboarding task updated successfully',
      task
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOnboardingTaskController = async (req, res) => {
  try {
    const result = await deleteOnboardingTask(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOnboardingTasksByEmployeeController = async (req, res) => {
  try {
    const tasks = await getOnboardingTasksByEmployee(req.params.employeeId);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOnboardingStatsController = async (req, res) => {
  try {
    const stats = await getOnboardingStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOffboardingProcessesController = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      employeeId: req.query.employeeId,
      page: req.query.page,
      limit: req.query.limit
    };
    
    const result = await getAllOffboardingProcesses(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOffboardingProcessByIdController = async (req, res) => {
  try {
    const process = await getOffboardingProcessById(req.params.id);
    res.json({ process });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createOffboardingProcessController = async (req, res) => {
  try {
    const process = await createOffboardingProcess(req.body);
    res.status(201).json({
      message: 'Offboarding process created successfully',
      process
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOffboardingProcessController = async (req, res) => {
  try {
    const process = await updateOffboardingProcess(req.params.id, req.body);
    res.json({
      message: 'Offboarding process updated successfully',
      process
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOffboardingProcessController = async (req, res) => {
  try {
    const result = await deleteOffboardingProcess(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllOnboardingTasksController,
  getOnboardingTaskByIdController,
  createOnboardingTaskController,
  updateOnboardingTaskController,
  deleteOnboardingTaskController,
  getOnboardingTasksByEmployeeController,
  getOnboardingStatsController,
  getAllOffboardingProcessesController,
  getOffboardingProcessByIdController,
  createOffboardingProcessController,
  updateOffboardingProcessController,
  deleteOffboardingProcessController
};