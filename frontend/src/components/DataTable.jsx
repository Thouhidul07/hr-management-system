import React from 'react';
import '../styles/DataTable.css';

const DataTable = ({ 
  columns, 
  data = [], 
  loading = false, 
  pagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {}
}) => {
  const handlePrevious = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);

  if (loading) {
    return <div className="table-loading">Loading...</div>;
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="empty-cell">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {pagination && totalPages > 1 && (
        <div className="table-pagination">
          <button 
            onClick={handlePrevious} 
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline-primary"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline-primary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
