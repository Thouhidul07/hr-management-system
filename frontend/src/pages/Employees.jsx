import React, { useMemo, useState } from 'react';
import { FaDownload, FaFilter, FaPlus, FaSearch } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import PageCard from '../components/PageCard';
import Badge from '../components/Badge';
import '../styles/Employees.css';

const initialEmployees = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', phone: '+1 234 567 8901', department: 'Engineering', position: 'Senior Developer', status: 'Active' },
  { id: 2, firstName: 'Sarah', lastName: 'Smith', email: 'sarah.smith@company.com', phone: '+1 234 567 8902', department: 'Marketing', position: 'Marketing Manager', status: 'Active' },
  { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', phone: '+1 234 567 8903', department: 'Sales', position: 'Sales Executive', status: 'Active' },
  { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@company.com', phone: '+1 234 567 8904', department: 'HR', position: 'HR Specialist', status: 'Active' },
  { id: 5, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@company.com', phone: '+1 234 567 8905', department: 'Finance', position: 'Financial Analyst', status: 'On Leave' },
  { id: 6, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa.anderson@company.com', phone: '+1 234 567 8906', department: 'Engineering', position: 'UX Designer', status: 'Active' },
  { id: 7, firstName: 'James', lastName: 'Taylor', email: 'james.taylor@company.com', phone: '+1 234 567 8907', department: 'Sales', position: 'Sales Manager', status: 'Active' },
  { id: 8, firstName: 'Emma', lastName: 'Martinez', email: 'emma.martinez@company.com', phone: '+1 234 567 8908', department: 'Marketing', position: 'Content Writer', status: 'Active' },
];

const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    status: 'Active',
  });

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch = !query || [employee.firstName, employee.lastName, employee.email, employee.position]
        .join(' ')
        .toLowerCase()
        .includes(query);
      const matchesDept = selectedDept === 'all' || employee.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, selectedDept]);

  const stats = {
    total: employees.length,
    active: employees.filter((employee) => employee.status === 'Active').length,
    onLeave: employees.filter((employee) => employee.status === 'On Leave').length,
    newThisMonth: 23,
  };

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const pagedEmployees = filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const startItem = filteredEmployees.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const endItem = Math.min(currentPage * pageSize, filteredEmployees.length);

  const getInitials = (employee) => `${employee.firstName[0]}${employee.lastName[0]}`.toUpperCase();

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      status: 'Active',
    });
    setShowAddModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      status: employee.status,
    });
    setShowAddModal(true);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((currentEmployees) => currentEmployees.filter((employee) => employee.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingEmployee) {
      setEmployees((currentEmployees) => currentEmployees.map((employee) => (
        employee.id === editingEmployee.id ? { ...employee, ...formData } : employee
      )));
    } else {
      setEmployees((currentEmployees) => [
        {
          id: Date.now(),
          ...formData,
        },
        ...currentEmployees,
      ]);
    }

    setShowAddModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  return (
    <div className="employees-page">
      <div className="page-header employees-header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage your organization&apos;s employees</p>
        </div>
        <button className="btn btn-primary employees-action-btn" onClick={handleAddEmployee}>
          <FaPlus /> Add Employee
        </button>
      </div>

      <div className="employees-kpi-grid">
        <KPICard title="Total Employees" value={stats.total} color="primary" />
        <KPICard title="Active" value={stats.active} color="success" />
        <KPICard title="On Leave" value={stats.onLeave} color="warning" />
        <KPICard title="New This Month" value={stats.newThisMonth} color="info" />
      </div>

      <PageCard className="employees-toolbar-card">
        <div className="employees-toolbar">
          <div className="employees-search">
            <FaSearch className="employees-search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="employees-toolbar-actions">
            <select
              className="form-control employees-select"
              value={selectedDept}
              onChange={(event) => {
                setSelectedDept(event.target.value);
                setCurrentPage(1);
              }}
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department === 'all' ? 'All Departments' : department}
                </option>
              ))}
            </select>
            <button className="btn btn-light employees-toolbar-btn" type="button">
              <FaFilter /> More Filters
            </button>
            <button className="btn btn-light employees-toolbar-btn" type="button">
              <FaDownload /> Export
            </button>
          </div>
        </div>
      </PageCard>

      <PageCard title="Employees" className="employees-table-card">
        <div className="employees-table-wrap">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-identity">
                      <div className="employee-avatar">{getInitials(employee)}</div>
                      <div>
                        <div className="employee-name">{employee.firstName} {employee.lastName}</div>
                        <div className="employee-email">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="employee-contact">
                      <span>{employee.email}</span>
                      <span>{employee.phone}</span>
                    </div>
                  </td>
                  <td>
                    <Badge label={employee.department} variant="secondary" />
                  </td>
                  <td>{employee.position}</td>
                  <td>
                    <Badge
                      label={employee.status}
                      variant={employee.status === 'Active' ? 'success' : 'warning'}
                    />
                  </td>
                  <td>
                    <div className="employee-actions">
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEditEmployee(employee)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteEmployee(employee.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="employees-pagination">
          <span>Showing {startItem}-{endItem} of {filteredEmployees.length} employees</span>
          <div className="employees-pagination-controls">
            <button
              className="btn btn-light btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-light btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </PageCard>

      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content employees-modal">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingEmployee ? 'Edit Employee' : 'Add Employee'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="employees-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Department</label>
                      <select className="form-control" name="department" value={formData.department} onChange={handleInputChange} required>
                        <option value="">Select department</option>
                        {departments.filter((department) => department !== 'all').map((department) => (
                          <option key={department} value={department}>{department}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Role</label>
                      <input className="form-control" name="position" value={formData.position} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-control" name="status" value={formData.status} onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingEmployee ? 'Update' : 'Add'} Employee</button>
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

export default Employees;
