import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import ChartComponent from '../components/Chart';
import PageCard from '../components/PageCard';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import '../styles/Payroll.css';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([
    { id: 1, employee: 'John Smith', empId: 'EMP001', department: 'Engineering', gross: '$6,500', deductions: '$850', net: '$5,650', status: 'PROCESSED' },
    { id: 2, employee: 'Sarah Connor', empId: 'EMP002', department: 'HR', gross: '$5,200', deductions: '$680', net: '$4,520', status: 'PROCESSED' },
    { id: 3, employee: 'Mike Johnson', empId: 'EMP003', department: 'Sales', gross: '$6,800', deductions: '$920', net: '$5,880', status: 'PENDING' },
    { id: 4, employee: 'Emma Davis', empId: 'EMP004', department: 'Marketing', gross: '$5,500', deductions: '$720', net: '$4,780', status: 'PROCESSED' },
    { id: 5, employee: 'David Wilson', empId: 'EMP005', department: 'Finance', gross: '$7,000', deductions: '$950', net: '$6,050', status: 'PROCESSED' },
  ]);

  const [monthlyTrend, setMonthlyTrend] = useState([
    { month: 'Oct', payroll: 112000 },
    { month: 'Nov', payroll: 115000 },
    { month: 'Dec', payroll: 118000 },
    { month: 'Jan', payroll: 110000 },
    { month: 'Feb', payroll: 116000 },
    { month: 'Mar', payroll: 120000 },
  ]);

  const [salaryBreakdown, setSalaryBreakdown] = useState({
    basic: 5000,
    hra: 1550,
    transport: 800,
    special: 1300,
    totalGross: 8650,
    providentFund: -543,
    incomeTax: -520,
    professionalTax: -177,
    totalDeductions: -1240,
    netSalary: 7300,
  });

  const stats = {
    totalPayroll: '$36,800',
    netPayable: '$31,830',
    deductions: '$4,970',
    employeesPaid: '1,234',
  };

  const payrollColumns = [
    { key: 'employee', label: 'Employee' },
    { key: 'empId', label: 'Employee ID' },
    { key: 'department', label: 'Department' },
    { key: 'gross', label: 'Gross Salary' },
    { key: 'deductions', label: 'Deductions' },
    { key: 'net', label: 'Net Salary' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <Badge label={status} variant={status === 'PROCESSED' ? 'success' : 'warning'} />
      )
    },
  ];

  return (
    <div className="payroll-page">
      <div className="page-header">
        <h1>Payroll Management</h1>
        <button className="btn btn-primary"><FaPlus /> Process Payroll</button>
      </div>

      <div className="stats-grid">
        <KPICard title="Total Payroll" value={stats.totalPayroll} color="primary" />
        <KPICard title="Net Payable" value={stats.netPayable} color="success" />
        <KPICard title="Total Deductions" value={stats.deductions} color="warning" />
        <KPICard title="Employees Paid" value={stats.employeesPaid} color="info" />
      </div>

      <PageCard title="Monthly Payroll Trend">
        <ChartComponent
          type="bar"
          data={monthlyTrend}
          dataKey="month"
          bars={[{ dataKey: 'payroll' }]}
        />
      </PageCard>

      <PageCard title="Salary Breakdown (Sample)">
        <div className="salary-breakdown">
          <div className="breakdown-section">
            <h5>Earnings</h5>
            <div className="breakdown-row">
              <span>Basic Salary</span>
              <span>${salaryBreakdown.basic}</span>
            </div>
            <div className="breakdown-row">
              <span>HRA</span>
              <span>${salaryBreakdown.hra}</span>
            </div>
            <div className="breakdown-row">
              <span>Transport Allowance</span>
              <span>${salaryBreakdown.transport}</span>
            </div>
            <div className="breakdown-row">
              <span>Special Allowance</span>
              <span>${salaryBreakdown.special}</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Gross</span>
              <span>${salaryBreakdown.totalGross}</span>
            </div>
          </div>

          <div className="breakdown-section">
            <h5>Deductions</h5>
            <div className="breakdown-row">
              <span>Provident Fund</span>
              <span>${Math.abs(salaryBreakdown.providentFund)}</span>
            </div>
            <div className="breakdown-row">
              <span>Income Tax</span>
              <span>${Math.abs(salaryBreakdown.incomeTax)}</span>
            </div>
            <div className="breakdown-row">
              <span>Professional Tax</span>
              <span>${Math.abs(salaryBreakdown.professionalTax)}</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Deductions</span>
              <span>${Math.abs(salaryBreakdown.totalDeductions)}</span>
            </div>
          </div>

          <div className="breakdown-section">
            <div className="breakdown-row net-salary">
              <span>Net Salary</span>
              <span>${salaryBreakdown.netSalary}</span>
            </div>
          </div>
        </div>
      </PageCard>

      <PageCard title="Payroll Details - March 2026">
        <DataTable columns={payrollColumns} data={payrollData} />
      </PageCard>
    </div>
  );
};

export default Payroll;
