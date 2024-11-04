import React from 'react';
import './LoadModal.css'; // Import the CSS file

const LoadModal = ({ isOpen, onClose, loadData }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Load Data</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Theory Hours/Week</th>
              <th>Total Theory Hours</th>
              <th>Practical Hours/Week</th>
              <th>Total Practical Hours</th>
              <th>Batch Count</th>
              <th>Division Count</th>
              <th>Total Faculty Hours</th>
            </tr>
          </thead>
          <tbody>
            {loadData.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.theory_hours_per_week}</td>
                <td>{item.total_theory_hours}</td>
                <td>{item.practical_hours_per_week}</td>
                <td>{item.total_practical_hours}</td>
                <td>{item.batch_count}</td>
                <td>{item.division_count}</td>
                <td>{item.total_faculty_hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoadModal;