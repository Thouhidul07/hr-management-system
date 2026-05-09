import React, { useState } from 'react';
import { FaPlus, FaCheckCircle, FaTimes, FaHourglassEnd } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import ChartComponent from '../components/Chart';
import PageCard from '../components/PageCard';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import '../styles/Expense.css';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([
    { id: 1, employee: 'John Smith', type: 'Travel', description: 'Flight to NYC', amount: '$450', date: '2026-05-08', status: 'APPROVED' },
    { id: 2, employee: 'Sarah Connor', type: 'Meals', description: 'Client dinner', amount: '$120', date: '2026-05-07', status: 'PENDING' },
    { id: 3, employee: 'Mike Johnson', type: 'Accommodation', description: 'Hotel stay', amount: '$280', date: '2026-05-06', status: 'REJECTED' },
    { id: 4, employee: 'Emma Davis', type: 'Training', description: 'Conference ticket', amount: '$350', date: '2026-05-05', status: 'APPROVED' },
    { id: 5, employee: 'David Wilson', type: 'Office Supplies', description: 'Stationery', amount: '$85', date: '2026-05-04', status: 'APPROVED' },
  ]);

  const [expenseByCategory, setExpenseByCategory] = useState([
    { name: 'Travel', value: 2450 },
    { name: 'Meals', value: 850 },
    { name: 'Accommodation', value: 1200 },
    { name: 'Training', value: 3200 },
    { name: 'Office Supplies', value: 680 },
  ]);

  const stats = {
    totalClaims: '$2,860',
    approved: '$1,410',
    pending: '$770',
    avgClaim: '$477',
  };

  const expenseColumns = [
    { key: 'employee', label: 'Employee' },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <Badge
          label={status}
          variant={status === 'APPROVED' ? 'success' : status === 'PENDING' ? 'warning' : 'danger'}
        />
      )
    },
  ];

  return (
    <div className="expense-page">
      <div className="page-header">
        <h1>Expense Management</h1>
        <button className="btn btn-primary"><FaPlus /> Submit Expense</button>
      </div>

      <div className="stats-grid">
        <KPICard title="Total Claims" value={stats.totalClaims} color="primary" />
        <KPICard title="Approved" value={stats.approved} color="success" />
        <KPICard title="Pending" value={stats.pending} color="warning" />
        <KPICard title="Avg. Claim" value={stats.avgClaim} color="info" />
      </div>

      <PageCard title="Expenses by Category">
        <ChartComponent
          type="donut"
          data={expenseByCategory}
          dataKey="value"
        />
      </PageCard>

      <PageCard title="Recent Expense Claims">
        <DataTable columns={expenseColumns} data={expenseData} />
      </PageCard>
    </div>
  );
};

export default Expense;
