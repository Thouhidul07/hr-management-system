const { 
  getAllAttendanceRecords, 
  getAttendanceById, 
  clockIn, 
  clockOut, 
  updateAttendance, 
  deleteAttendance, 
  getAttendanceReport,
  getAttendanceStats
} = require('../services/attendance.service');

const getAllAttendanceRecordsController = async (req, res) => {
  try {
    const filters = {
      employeeId: req.query.employeeId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      status: req.query.status,
      page: req.query.page,
      limit: req.query.limit
    };
    
    const result = await getAllAttendanceRecords(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceByIdController = async (req, res) => {
  try {
    const record = await getAttendanceById(req.params.id);
    res.json({ record });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const clockInController = async (req, res) => {
  try {
    const { employeeId, notes } = req.body;
    const record = await clockIn(employeeId, notes);
    res.status(201).json({
      message: 'Clocked in successfully',
      record
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const clockOutController = async (req, res) => {
  try {
    const { employeeId, notes } = req.body;
    const result = await clockOut(employeeId, notes);
    res.json({
      message: 'Clocked out successfully',
      record: result.updatedRecord,
      workHours: result.workHours
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAttendanceController = async (req, res) => {
  try {
    const record = await updateAttendance(req.params.id, req.body);
    res.json({
      message: 'Attendance record updated successfully',
      record
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAttendanceController = async (req, res) => {
  try {
    const result = await deleteAttendance(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAttendanceReportController = async (req, res) => {
  try {
    const filters = {
      employeeId: req.query.employeeId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      department: req.query.department,
      page: req.query.page,
      limit: req.query.limit
    };
    
    const result = await getAttendanceReport(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceStatsController = async (req, res) => {
  try {
    const stats = await getAttendanceStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAttendanceRecordsController,
  getAttendanceByIdController,
  clockInController,
  clockOutController,
  updateAttendanceController,
  deleteAttendanceController,
  getAttendanceReportController,
  getAttendanceStatsController
};