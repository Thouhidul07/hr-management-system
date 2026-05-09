import React, { useState } from 'react';
import { FaPlus, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import PageCard from '../components/PageCard';
import DataTable from '../components/DataTable';
import '../styles/Roles.css';

const Roles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      userCount: 3,
      description: 'Full system access and control',
      icon: '👤',
    },
    {
      id: 2,
      name: 'HR Admin',
      userCount: 8,
      description: 'Manage employee records, leave, payroll',
      icon: '👥',
    },
    {
      id: 3,
      name: 'Manager',
      userCount: 42,
      description: 'Manage team members and approve requests',
      icon: '📊',
    },
    {
      id: 4,
      name: 'Employee',
      userCount: 1181,
      description: 'Basic access to personal records',
      icon: '👨‍💼',
    },
    {
      id: 5,
      name: 'Payroll Officer',
      userCount: 5,
      description: 'Process payroll and manage compensation',
      icon: '💰',
    },
  ]);

  const [permissions, setPermissions] = useState([
    { module: 'Dashboard', view: true, create: false, edit: false, delete: false },
    { module: 'Employee Management', view: true, create: true, edit: true, delete: true },
    { module: 'Attendance', view: true, create: false, edit: false, delete: false },
    { module: 'Leave Management', view: true, create: true, edit: true, delete: false },
    { module: 'Payroll', view: true, create: true, edit: true, delete: false },
    { module: 'Performance', view: true, create: false, edit: false, delete: false },
    { module: 'Training', view: true, create: false, edit: false, delete: false },
  ]);

  const stats = {
    totalRoles: roles.length,
    totalUsers: roles.reduce((sum, role) => sum + role.userCount, 0),
    customRoles: 2,
    activeSessions: 856,
  };

  const permissionColumns = [
    { key: 'module', label: 'Module' },
    {
      key: 'view',
      label: 'View',
      render: (value) => value ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />
    },
    {
      key: 'create',
      label: 'Create',
      render: (value) => value ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />
    },
    {
      key: 'edit',
      label: 'Edit',
      render: (value) => value ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />
    },
    {
      key: 'delete',
      label: 'Delete',
      render: (value) => value ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />
    },
  ];

  return (
    <div className="roles-page">
      <div className="page-header">
        <h1>Roles & Permissions</h1>
        <button className="btn btn-primary"><FaPlus /> Create Role</button>
      </div>

      <div className="stats-grid">
        <KPICard title="Total Roles" value={stats.totalRoles} color="primary" />
        <KPICard title="Total Users" value={stats.totalUsers} color="success" />
        <KPICard title="Custom Roles" value={stats.customRoles} color="info" />
        <KPICard title="Active Sessions" value={stats.activeSessions} color="warning" />
      </div>

      <PageCard title="System Roles">
        <div className="roles-grid">
          {roles.map((role) => (
            <div key={role.id} className="role-card">
              <div className="role-icon">{role.icon}</div>
              <h4>{role.name}</h4>
              <p className="role-description">{role.description}</p>
              <p className="role-users">{role.userCount} users</p>
              <button className="btn btn-sm btn-outline-primary mt-2">Edit</button>
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard title="Permission Matrix - HR Admin Role">
        <DataTable columns={permissionColumns} data={permissions} />
      </PageCard>
    </div>
  );
};

export default Roles;
