import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { employeesAPI, attendanceAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch employee stats
        const employeeStats = await employeesAPI.getStats();
        
        // Fetch attendance stats for today
        const today = new Date().toISOString().split('T')[0];
        const attendanceResponse = await attendanceAPI.getAll({
          startDate: today,
          endDate: today,
          limit: 1000,
        });
        
        const attendanceRecords = attendanceResponse.data.records || [];
        const presentCount = attendanceRecords.filter(
          record => record.status === 'Present'
        ).length;
        const absentCount = attendanceRecords.filter(
          record => record.status === 'Absent'
        ).length;
        
        setStats({
          totalEmployees: employeeStats.data.totalEmployees || 0,
          presentToday: presentCount,
          absentToday: absentCount,
          pendingTasks: 0, // This would need to be fetched from onboarding API
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: 'primary',
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: '✅',
      color: 'success',
    },
    {
      title: 'Absent Today',
      value: stats.absentToday,
      icon: '❌',
      color: 'danger',
    },
    {
      title: 'Pending Tasks',
      value: stats.pendingTasks,
      icon: '📋',
      color: 'warning',
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <Card key={index} title={card.title}>
            <div className="card-content">
              <div className="card-icon">{card.icon}</div>
              <div className="card-value">{card.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-charts">
        <Card title="Recent Activity">
          <div className="activity-placeholder">
            <p>Recent activity will be displayed here.</p>
          </div>
        </Card>
        
        <Card title="Upcoming Tasks">
          <div className="tasks-placeholder">
            <p>Upcoming tasks will be displayed here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;