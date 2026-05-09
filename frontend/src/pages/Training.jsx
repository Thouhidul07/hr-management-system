import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import PageCard from '../components/PageCard';
import DataTable from '../components/DataTable';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import '../styles/Training.css';

const Training = () => {
  const [myTrainings] = useState([
    { id: 1, title: 'Leadership Fundamentals', progress: 75, dueDate: '2026-04-15', status: 'IN_PROGRESS' },
    { id: 2, title: 'Time Management', progress: 100, dueDate: '2026-03-28', status: 'COMPLETED' },
    { id: 3, title: 'Conflict Resolution', progress: 40, dueDate: '2026-04-20', status: 'IN_PROGRESS' },
  ]);

  const [availableCourses] = useState([
    { id: 1, title: 'Advanced React', category: 'Technical', duration: '20 hours', enrolled: 45, completion: 78 },
    { id: 2, title: 'Project Management', category: 'Leadership', duration: '15 hours', enrolled: 32, completion: 65 },
    { id: 3, title: 'Communication Skills', category: 'Soft Skills', duration: '10 hours', enrolled: 58, completion: 82 },
    { id: 4, title: 'Data Analytics', category: 'Technical', duration: '25 hours', enrolled: 28, completion: 45 },
  ]);

  const stats = {
    totalCourses: '48',
    activeLearners: '342',
    certifications: '156',
    avgHoursMonth: '8.5',
  };

  const courseColumns = [
    { key: 'title', label: 'Course' },
    { key: 'category', label: 'Category' },
    { key: 'duration', label: 'Duration' },
    { key: 'enrolled', label: 'Enrolled' },
    {
      key: 'completion',
      label: 'Completion',
      render: (completion) => (
        <ProgressBar value={completion} max={100} showLabel={false} color="primary" />
      )
    },
  ];

  return (
    <div className="training-page">
      <div className="page-header">
        <h1>Training & Development</h1>
        <button className="btn btn-primary"><FaPlus /> Enroll New Course</button>
      </div>

      <div className="stats-grid">
        <KPICard title="Total Courses" value={stats.totalCourses} color="primary" />
        <KPICard title="Active Learners" value={stats.activeLearners} color="success" />
        <KPICard title="Certifications" value={stats.certifications} color="info" />
        <KPICard title="Avg. Hours/Month" value={stats.avgHoursMonth} color="warning" />
      </div>

      <PageCard title="My Current Trainings">
        <div className="training-cards">
          {myTrainings.map((training) => (
            <div key={training.id} className="training-card">
              <div className="training-header">
                <h5>{training.title}</h5>
                <Badge label={training.status} variant={training.status === 'COMPLETED' ? 'success' : 'info'} />
              </div>
              <div className="training-content">
                <ProgressBar value={training.progress} max={100} label={`${training.progress}% Complete`} color="primary" />
                <p className="due-date">Due: {training.dueDate}</p>
                <button className="btn btn-sm btn-primary mt-2">Continue Learning</button>
              </div>
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard title="Available Courses">
        <DataTable columns={courseColumns} data={availableCourses} />
      </PageCard>
    </div>
  );
};

export default Training;

