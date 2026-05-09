import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { attendanceAPI } from '../services/api';
import '../styles/Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [clockInData, setClockInData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'Present',
  });
  const [clockOutData, setClockOutData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'Present',
  });

  useEffect(() => {
    fetchAttendanceRecords();
  }, [currentPage]);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getAll({
        page: currentPage,
        limit: 10,
        search: searchTerm,
      });
      
      setAttendanceRecords(response.data.records || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleClockIn = () => {
    setClockInData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present',
    });
    setShowClockInModal(true);
  };

  const handleClockOut = () => {
    setClockOutData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present',
    });
    setShowClockOutModal(true);
  };

  const handleClockInSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await attendanceAPI.clockIn(clockInData);
      setShowClockInModal(false);
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  const handleClockOutSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await attendanceAPI.clockOut(clockOutData);
      setShowClockOutModal(false);
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Error clocking out:', error);
    }
  };

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Present': 'bg-success',
      'Absent': 'bg-danger',
      'Late': 'bg-warning',
      'Half-day': 'bg-info',
      'Leave': 'bg-secondary',
    };
    
    return (
      <span className={`badge ${statusClasses[status] || 'bg-secondary'}`}>
        {status}
      </span>
    );
  };

  const filteredRecords = attendanceRecords.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="attendance-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance">
      <div className="attendance-header">
        <h1>Attendance Management</h1>
        <div className="attendance-actions">
          <button className="btn btn-success" onClick={handleClockIn}>
            Clock In
          </button>
          <button className="btn btn-danger ms-2" onClick={handleClockOut}>
            Clock Out
          </button>
        </div>
      </div>

      <div className="attendance-search">
        <input
          type="text"
          className="form-control"
          placeholder="Search attendance records..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="attendance-table">
        <Card title="Attendance Records">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Status</th>
                  <th>Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.employeeName}</td>
                    <td>{record.date}</td>
                    <td>{record.clockIn || '-'}</td>
                    <td>{record.clockOut || '-'}</td>
                    <td>{getStatusBadge(record.status)}</td>
                    <td>{record.hoursWorked || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="attendance-pagination">
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="mx-3">Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </Card>
      </div>

      {/* Clock In Modal */}
      {showClockInModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Clock In</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowClockInModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => handleClockInSubmit(e)}>
                  <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={clockInData.employeeId}
                      onChange={(e) => handleInputChange(e, setClockInData)}
                      required
                    >
                      <option value="">Select Employee</option>
                      {attendanceRecords.map((record) => (
                        <option key={record.id} value={record.employeeId}>
                          {record.employeeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={clockInData.date}
                        onChange={(e) => handleInputChange(e, setClockInData)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Time</label>
                      <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={clockInData.time}
                        onChange={(e) => handleInputChange(e, setClockInData)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={clockInData.status}
                      onChange={(e) => handleInputChange(e, setClockInData)}
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="Half-day">Half-day</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowClockInModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Clock In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clock Out Modal */}
      {showClockOutModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Clock Out</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowClockOutModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => handleClockOutSubmit(e)}>
                  <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={clockOutData.employeeId}
                      onChange={(e) => handleInputChange(e, setClockOutData)}
                      required
                    >
                      <option value="">Select Employee</option>
                      {attendanceRecords.map((record) => (
                        <option key={record.id} value={record.employeeId}>
                          {record.employeeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={clockOutData.date}
                        onChange={(e) => handleInputChange(e, setClockOutData)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Time</label>
                      <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={clockOutData.time}
                        onChange={(e) => handleInputChange(e, setClockOutData)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={clockOutData.status}
                      onChange={(e) => handleInputChange(e, setClockOutData)}
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="Half-day">Half-day</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowClockOutModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Clock Out
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

export default Attendance;