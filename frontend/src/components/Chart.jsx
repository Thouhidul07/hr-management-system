import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import '../styles/Chart.css';

const ChartComponent = ({ type = 'line', data, title, ...props }) => {
  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.dataKey || 'name'} />
              <YAxis />
              <Tooltip />
              <Legend />
              {props.lines?.map((line, idx) => (
                <Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={colors[idx % colors.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.dataKey || 'name'} />
              <YAxis />
              <Tooltip />
              <Legend />
              {props.bars?.map((bar, idx) => (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  fill={colors[idx % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={props.dataKey || 'value'}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey={props.dataKey || 'value'}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey={props.angleKey || 'name'} />
              <PolarRadiusAxis />
              <Radar
                name={props.radarName || 'Current'}
                dataKey={props.dataKey || 'value'}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
              />
              {props.targetDataKey && (
                <Radar
                  name={props.targetName || 'Target'}
                  dataKey={props.targetDataKey}
                  stroke={colors[1]}
                  fill={colors[1]}
                  fillOpacity={0.3}
                />
              )}
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-content">{renderChart()}</div>
    </div>
  );
};

export default ChartComponent;
