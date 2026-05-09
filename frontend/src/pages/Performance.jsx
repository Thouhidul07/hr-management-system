import React, { useState } from 'react';
import { FaPlus, FaStar } from 'react-icons/fa';
import KPICard from '../components/KPICard';
import ChartComponent from '../components/Chart';
import PageCard from '../components/PageCard';
import ProgressBar from '../components/ProgressBar';
import DataTable from '../components/DataTable';
import '../styles/Performance.css';

const Performance = () => {
  const [currentGoals, setCurrentGoals] = useState([
    { id: 1, goal: 'Complete React Advanced Course', progress: 75, status: 'ON_TRACK' },
    { id: 2, goal: 'Lead 2 major projects', progress: 50, status: 'ON_TRACK' },
    { id: 3, goal: 'Mentor 3 junior developers', progress: 33, status: 'AT_RISK' },
    { id: 4, goal: 'Improve code review quality', progress: 90, status: 'AHEAD' },
  ]);

  const [skillsAssessment, setSkillsAssessment] = useState([
    { skill: 'Technical', current: 85, target: 90 },
    { skill: 'Communication', current: 78, target: 85 },
    { skill: 'Leadership', current: 72, target: 80 },
    { skill: 'Problem Solving', current: 88, target: 90 },
    { skill: 'Teamwork', current: 82, target: 88 },
    { skill: 'Time Management', current: 75, target: 80 },
  ]);

  const [reviewCycle, setReviewCycle] = useState([
    { step: 1, name: 'Self Assessment', status: 'COMPLETED', date: '2026-03-11' },
    { step: 2, name: 'Manager Review', status: 'IN_PROGRESS', date: '2026-03-20' },
    { step: 3, name: 'Calibration', status: 'PENDING', date: '2026-04-10' },
    { step: 4, name: 'Final Review', status: 'PENDING', date: '2026-04-23' },
  ]);

  const stats = {
    overallRating: '4.3/5.0',
    goalsAchieved: '85%',
    topPerformers: '124',
    reviewsPending: '32',
  };

  return (
    <div className="performance-page">
      <div className="page-header">
        <h1>Performance Management</h1>
        <button className="btn btn-primary"><FaPlus /> Start Review</button>
      </div>

      <div className="stats-grid">
        <KPICard title="Overall Rating" value={stats.overallRating} color="primary" />
        <KPICard title="Goals Achieved" value={stats.goalsAchieved} color="success" />
        <KPICard title="Top Performers" value={stats.topPerformers} color="info" />
        <KPICard title="Reviews Pending" value={stats.reviewsPending} color="warning" />
      </div>

      <PageCard title="Skills Assessment">
        <ChartComponent
          type="radar"
          data={skillsAssessment}
          angleKey="skill"
          dataKey="current"
          targetDataKey="target"
          radarName="Current"
          targetName="Target"
        />
      </PageCard>

      <PageCard title="Current Goals">
        <div className="goals-list">
          {currentGoals.map((goal) => (
            <div key={goal.id} className="goal-item">
              <div className="goal-info">
                <h5>{goal.goal}</h5>
                <span className={`goal-status status-${goal.status.toLowerCase()}`}>{goal.status}</span>
              </div>
              <ProgressBar value={goal.progress} max={100} label={`${goal.progress}%`} color="primary" showLabel={true} />
            </div>
          ))}
        </div>
      </PageCard>

      <PageCard title="Review Cycle">
        <div className="review-cycle">
          {reviewCycle.map((step, idx) => (
            <div key={step.step} className="cycle-step">
              <div className={`step-number status-${step.status.toLowerCase()}`}>{step.step}</div>
              <div className="step-content">
                <h5>{step.name}</h5>
                <p className="step-status">{step.status}</p>
                <p className="step-date">{step.date}</p>
              </div>
              {idx < reviewCycle.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </PageCard>
    </div>
  );
};

export default Performance;
