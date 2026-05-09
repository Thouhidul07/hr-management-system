import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { employeesAPI, attendanceAPI } from '../services/api';
import '../styles/Leave.css';

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [leaveForm, setLeaveForm] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    type: 'Annual',
    reason: '',
    status: 'Pending',
  });

  useEffect(() => {
    fetchLeaveRequests();
    fetchEmployees();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      // In a real implementation, this would call a specific leave API
      // For now, we'll simulate with attendance data
      const response = await attendanceAPI.getAll({
        limit: 100,
        status: 'Leave',
      });
      
      // Transform attendance data to look like leave requests
      const leaveData = (response.data.attendance || []).map(record => ({
        id: record.id,
        employeeName: record.employeeName,
        startDate: record.date,
        endDate: record.date,
        type: 'Annual',
        reason: 'Leave',
        status: 'Approved',
      }));
      
      setLeaveRequests(leaveData);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await employeesAPI.getAll({
        limit: 100,
      });
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddLeave = () => {
    setLeaveForm({
      employeeId: '',
      startDate: '',
      endDate: '',
      type: 'Annual',
      reason: '',
      status: 'Pending',
    });
    setEditingLeave(null);
    setShowLeaveModal(true);
  };

  const handleEditLeave = (leave) => {
    setLeaveForm({
      employeeId: leave.employeeId,
      startDate: leave.startDate,
      endDate: leave.endDate,
      type: leave.type,
      reason: leave.reason,
      status: leave.status,
    });
    setEditingLeave(leave);
    setShowLeaveModal(true);
  };

  const handleDeleteLeave = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        // In a real implementation, this would call a specific leave API
        // For now, we'll just remove from state
        setLeaveRequests(prev => prev.filter(leave => leave.id !== id));
      } catch (error) {
        console.error('Error deleting leave request:', error);
      }
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingLeave) {
        // In a real implementation, this would call a specific leave API
        // For now, we'll just update the state
        setLeaveRequests(prev => prev.map(leave => 
          leave.id === editingLeave.id ? { ...leaveForm, id: editingLeave.id } : leave
        ));
      } else {
        // In a real implementation, this would call a specific leave API
        // For now, we'll just add to state
        const newLeave = {
          ...leaveForm,
          id: Date.now(),
          employeeName: employees.find(emp => emp.id === leaveForm.employeeId)?.name || 'Unknown',
        };
        setLeaveRequests(prev => [...prev, newLeave]);
      }
      
      setShowLeaveModal(false);
    } catch (error) {
      console.error('Error saving leave request:', error);
    }
  };

  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'bg-warning',
      'Approved': 'bg-success',
      'Rejected': 'bg-danger',
    };
    
    return (
      <span className={`badge ${statusClasses[status] || 'bg-secondary'}`}>
        {status}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      'Annual': 'bg-primary',
      'Sick': 'bg-info',
      'Maternity': 'bg-secondary',
      'Paternity': 'bg-secondary',
      'Unpaid': 'bg-dark',
    };
    
    return (
      <span className={`badge ${typeClasses[type] || 'bg-secondary'}`}>
        {type}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="leave-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="leave">
      <div className="leave-header">
        <h1>Leave Management</h1>
        <button className="btn btn-primary" onClick={handleAddLeave}>
          Request Leave
        </button>
      </div>

      <div className="leave-table">
        <Card title="Leave Requests">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.employeeName}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{getTypeBadge(leave.type)}</td>
                    <td>{getStatusBadge(leave.status)}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditLeave(leave)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDeleteLeave(leave.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingLeave ? 'Edit Leave Request' : 'Request Leave'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLeaveModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLeaveSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={leaveForm.employeeId}
                      onChange={handleLeaveInputChange}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {`${employee.firstName} ${employee.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={leaveForm.startDate}
                        onChange={handleLeaveInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={leaveForm.endDate}
                        onChange={handleLeaveInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Leave Type</label>
                    <select
                      className="form-control"
                      name="type"
                      value={leaveForm.type}
                      onChange={handleLeaveInputChange}
                    >
                      <option value="Annual">Annual</option>
                      <option value="Sick">Sick</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Paternity">Paternity</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                      className="form-control"
                      name="reason"
                      value={leaveForm.reason}
                      onChange={handleLeaveInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={leaveForm.status}
                      onChange={handleLeaveInputChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowLeaveModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingLeave ? 'Update' : 'Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;