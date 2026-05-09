import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { onboardingAPI } from '../services/api';
import '../styles/Onboarding.css';

const Onboarding = () => {
  const [tasks, setTasks] = useState([]);
  const [offboardingProcesses, setOffboardingProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showOffboardingModal, setShowOffboardingModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingOffboarding, setEditingOffboarding] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'Pending',
  });
  const [offboardingForm, setOffboardingForm] = useState({
    employeeId: '',
    reason: '',
    lastWorkingDay: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchTasks();
    fetchOffboardingProcesses();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await onboardingAPI.getTasks();
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOffboardingProcesses = async () => {
    try {
      const response = await onboardingAPI.getOffboarding();
      setOffboardingProcesses(response.data.offboarding || []);
    } catch (error) {
      console.error('Error fetching offboarding processes:', error);
    }
  };

  const handleAddTask = () => {
    setTaskForm({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      status: 'Pending',
    });
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      status: task.status,
    });
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onboardingAPI.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleAddOffboarding = () => {
    setOffboardingForm({
      employeeId: '',
      reason: '',
      lastWorkingDay: '',
      status: 'Active',
    });
    setEditingOffboarding(null);
    setShowOffboardingModal(true);
  };

  const handleEditOffboarding = (process) => {
    setOffboardingForm({
      employeeId: process.employeeId,
      reason: process.reason,
      lastWorkingDay: process.lastWorkingDay,
      status: process.status,
    });
    setEditingOffboarding(process);
    setShowOffboardingModal(true);
  };

  const handleDeleteOffboarding = async (id) => {
    if (window.confirm('Are you sure you want to delete this offboarding process?')) {
      try {
        await onboardingAPI.deleteOffboarding(id);
        fetchOffboardingProcesses();
      } catch (error) {
        console.error('Error deleting offboarding process:', error);
      }
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingTask) {
        await onboardingAPI.updateTask(editingTask.id, taskForm);
      } else {
        await onboardingAPI.createTask(taskForm);
      }
      
      setShowTaskModal(false);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleOffboardingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingOffboarding) {
        await onboardingAPI.updateOffboarding(editingOffboarding.id, offboardingForm);
      } else {
        await onboardingAPI.createOffboarding(offboardingForm);
      }
      
      setShowOffboardingModal(false);
      fetchOffboardingProcesses();
    } catch (error) {
      console.error('Error saving offboarding process:', error);
    }
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOffboardingInputChange = (e) => {
    const { name, value } = e.target;
    setOffboardingForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'bg-warning',
      'In Progress': 'bg-info',
      'Completed': 'bg-success',
      'Active': 'bg-success',
      'Completed': 'bg-success',
    };
    
    return (
      <span className={`badge ${statusClasses[status] || 'bg-secondary'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="onboarding-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding">
      <h1>Onboarding & Offboarding</h1>
      
      {/* Tabs */}
      <div className="onboarding-tabs">
        <button
          className={`btn ${activeTab === 'tasks' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Onboarding Tasks
        </button>
        <button
          className={`btn ms-2 ${activeTab === 'offboarding' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('offboarding')}
        >
          Offboarding Processes
        </button>
      </div>

      {/* Onboarding Tasks */}
      {activeTab === 'tasks' && (
        <div className="onboarding-tasks">
          <div className="onboarding-header">
            <h2>Onboarding Tasks</h2>
            <button className="btn btn-primary" onClick={handleAddTask}>
              Add Task
            </button>
          </div>

          <div className="onboarding-table">
            <Card title="Tasks">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Assigned To</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.assignedTo}</td>
                        <td>{task.dueDate || '-'}</td>
                        <td>{getStatusBadge(task.status)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditTask(task)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => handleDeleteTask(task.id)}
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
        </div>
      )}

      {/* Offboarding Processes */}
      {activeTab === 'offboarding' && (
        <div className="onboarding-offboarding">
          <div className="onboarding-header">
            <h2>Offboarding Processes</h2>
            <button className="btn btn-primary" onClick={handleAddOffboarding}>
              Add Process
            </button>
          </div>

          <div className="onboarding-table">
            <Card title="Offboarding Processes">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Reason</th>
                      <th>Last Working Day</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offboardingProcesses.map((process) => (
                      <tr key={process.id}>
                        <td>{process.employeeName}</td>
                        <td>{process.reason}</td>
                        <td>{process.lastWorkingDay}</td>
                        <td>{getStatusBadge(process.status)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditOffboarding(process)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => handleDeleteOffboarding(process.id)}
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
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingTask ? 'Edit Task' : 'Add Task'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTaskModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleTaskSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={taskForm.title}
                      onChange={handleTaskInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={taskForm.description}
                      onChange={handleTaskInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Assigned To</label>
                      <input
                        type="text"
                        className="form-control"
                        name="assignedTo"
                        value={taskForm.assignedTo}
                        onChange={handleTaskInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        value={taskForm.dueDate}
                        onChange={handleTaskInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={taskForm.status}
                      onChange={handleTaskInputChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowTaskModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingTask ? 'Update' : 'Add'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offboarding Modal */}
      {showOffboardingModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingOffboarding ? 'Edit Offboarding Process' : 'Add Offboarding Process'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowOffboardingModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleOffboardingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={offboardingForm.employeeId}
                      onChange={handleOffboardingInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                      className="form-control"
                      name="reason"
                      value={offboardingForm.reason}
                      onChange={handleOffboardingInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Working Day</label>
                      <input
                        type="date"
                        className="form-control"
                        name="lastWorkingDay"
                        value={offboardingForm.lastWorkingDay}
                        onChange={handleOffboardingInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={offboardingForm.status}
                        onChange={handleOffboardingInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowOffboardingModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingOffboarding ? 'Update' : 'Add'}
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

export default Onboarding;