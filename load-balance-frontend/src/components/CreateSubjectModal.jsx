import React, { useState } from 'react';

const CreateSubjectModal = ({ isOpen, onClose, onCreate }) => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    code: '',
    total_theory_hours: '',
    total_practical_hours: '',
    theory_hours_per_week: '',
    practical_hours_per_week: '',
    division_count: '',
    batch_count: '',
  });

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(subjectData); // Call the create function with the subject data
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Subject</h2>
        <form onSubmit={handleSubmit}>
          {/* Add input fields for each subject property */}
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="code" placeholder="Code" onChange={handleChange} required />
          <input name="total_theory_hours" placeholder="Total Theory Hours" type="number" onChange={handleChange} required />
          <input name="total_practical_hours" placeholder="Total Practical Hours" type="number" onChange={handleChange} required />
          <input name="theory_hours_per_week" placeholder="Theory Hours/Week" type="number" onChange={handleChange} required />
          <input name="practical_hours_per_week" placeholder="Practical Hours/Week" type="number" onChange={handleChange} required />
          <input name="division_count" placeholder="Division Count" type="number" onChange={handleChange} required />
          <input name="batch_count" placeholder="Batch Count" type="number" onChange={handleChange} required />
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubjectModal;