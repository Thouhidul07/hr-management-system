import React from 'react';
import { FaUsers, FaCheckCircle, FaCalendarAlt, FaClock } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import ChartComponent from '../components/Chart';
import PageCard from '../components/PageCard';
import Badge from '../components/Badge';
import '../styles/Dashboard.css';

const dashboardStats = [
  { title: 'Total Employees', value: '1,234', change: '+12%', trend: 'up', color: 'primary', icon: FaUsers },
  { title: 'Present Today', value: '1,156', change: '+2%', trend: 'up', color: 'success', icon: FaCheckCircle },
  { title: 'On Leave', value: '48', change: '-5%', trend: 'down', color: 'warning', icon: FaCalendarAlt },
  { title: 'Avg. Work Hours', value: '8.2', change: '+0.5', trend: 'up', color: 'info', icon: FaClock },
];

const attendanceTrend = [
  { month: 'Jan', present: 1100 },
  { month: 'Feb', present: 1120 },
  { month: 'Mar', present: 1140 },
  { month: 'Apr', present: 1156 },
  { month: 'May', present: 1180 },
  { month: 'Jun', present: 1200 },
];

const departmentData = [
  { name: 'Engineering', value: 450 },
  { name: 'Sales', value: 280 },
  { name: 'Marketing', value: 180 },
  { name: 'HR', value: 120 },
  { name: 'Finance', value: 204 },
];

const recentActivity = [
  { id: 1, title: 'John Doe submitted leave request', meta: '5 min ago' },
  { id: 2, title: 'Sarah Smith completed onboarding', meta: '15 min ago' },
  { id: 3, title: 'Mike Johnson submitted expense claim', meta: '1 hour ago' },
  { id: 4, title: 'Emily Brown enrolled in training course', meta: '2 hours ago' },
  { id: 5, title: 'David Wilson updated profile information', meta: '3 hours ago' },
];

const upcomingEvents = [
  { id: 1, title: 'Payroll Processing', date: 'Apr 5, 2026', tag: 'payroll' },
  { id: 2, title: 'New Hire Orientation', date: 'Apr 7, 2026', tag: 'onboarding' },
  { id: 3, title: 'Performance Reviews Due', date: 'Apr 10, 2026', tag: 'performance' },
  { id: 4, title: 'Training Workshop', date: 'Apr 15, 2026', tag: 'training' },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <button className="btn btn-primary dashboard-action-btn">Generate Report</button>
      </div>

      <div className="dashboard-kpi-grid">
        {dashboardStats.map((stat) => (
          <KPICard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            color={stat.color}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <PageCard title="Attendance Trend" className="dashboard-panel dashboard-panel-wide">
          <ChartComponent
            type="line"
            data={attendanceTrend}
            dataKey="month"
            lines={[{ dataKey: 'present' }]}
          />
        </PageCard>

        <PageCard title="Department Distribution" className="dashboard-panel">
          <div className="dashboard-donut-wrap">
            <ChartComponent type="donut" data={departmentData} dataKey="value" />
            <div className="dashboard-department-legend">
              {departmentData.map((department) => (
                <div key={department.name} className="legend-row">
                  <span className="legend-dot" />
                  <span>{department.name}</span>
                  <strong>{department.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </PageCard>
      </div>

      <div className="dashboard-grid dashboard-grid-bottom">
        <PageCard title="Recent Activity" className="dashboard-panel">
          <div className="dashboard-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="dashboard-list-item">
                <div className="dashboard-list-bullet" />
                <div>
                  <h4>{activity.title}</h4>
                  <p>{activity.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </PageCard>

        <PageCard title="Upcoming Events" className="dashboard-panel">
          <div className="dashboard-events">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="dashboard-event-row">
                <div>
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                </div>
                <Badge label={event.tag} variant="secondary" size="sm" />
              </div>
            ))}
          </div>
        </PageCard>
      </div>
    </div>
  );
};

export default Dashboard;
