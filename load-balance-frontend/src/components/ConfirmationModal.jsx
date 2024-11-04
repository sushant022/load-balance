import React from 'react';

const ConfirmationModal = ({ isOpen, subjectName, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete {subjectName}?</p>
        <button onClick={onClose}>Reject</button>
        <button onClick={onConfirm}>Accept</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;