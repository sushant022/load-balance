import React, { useState, useEffect } from 'react';
import CreateSubjectModal from './CreateSubjectModal';
import ConfirmationModal from './ConfirmationModal';
import LoadModal from './LoadModal'; // Import the LoadModal

const SubjectsTable = ({ semesterId }) => {
  const [subjects, setSubjects] = useState([]); // State for subjects
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // State for confirmation modal visibility
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false); // State for load modal visibility
  const [subjectToDelete, setSubjectToDelete] = useState(null); // State for the subject to delete
  const [loadData, setLoadData] = useState([]); // State for load data

  const handleCreate = async (newSubject) => {
    if (!semesterId) return;
    try {
      const response = await fetch(`http://localhost:3000/semesters/${semesterId}/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubject),
      });
      if (!response.ok) {
        throw new Error('Failed to create subject');
      }
      const createdSubject = await response.json();
      setSubjects((prevSubjects) => [...prevSubjects, createdSubject]);
    } catch (error) {
      console.error('Error creating subject:', error.message);
    }
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openModal = (subject) => {
    setSubjectToDelete(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubjectToDelete(null);
  };

  const confirmDelete = async () => {
    if (!subjectToDelete) return;
    try {
      const response = await fetch(`http://localhost:3000/semesters/${semesterId}/subjects/${subjectToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete subject');
      }
      setSubjects((prevSubjects) => prevSubjects.filter(subject => subject.id !== subjectToDelete.id));
      closeModal();
    } catch (error) {
      console.error('Error deleting subject:', error.message);
    }
  };

  const fetchLoadData = async () => {
    if (!semesterId) return;
    try {
      const response = await fetch(`http://localhost:3000/semesters/${semesterId}/load`);
      const data = await response.json();
      setLoadData(data); // Set the load data
      setIsLoadModalOpen(true); // Open the load modal
    } catch (error) {
      console.error('Error fetching load data:', error);
    }
  };

  // Fetch subjects when semesterId changes
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!semesterId) return;
      try {
        const response = await fetch(`http://localhost:3000/semesters/${semesterId}/subjects`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, [semesterId]);

  return (
    <>
      <button onClick={openCreateModal}>New</button>
      <button onClick={fetchLoadData}>View Load</button> {/* New button to view load data */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Total Theory Hours</th>
            <th>Total Practical Hours</th>
            <th>Theory Hours/Week</th>
            <th>Practical Hours/Week</th>
            <th>Division Count</th>
            <th>Batch Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>{subject.code}</td>
              <td>{subject.total_theory_hours}</td>
              <td>{subject.total_practical_hours}</td>
              <td>{subject.theory_hours_per_week}</td>
              <td>{subject.practical_hours_per_week}</td>
              <td>{subject.division_count}</td>
              <td>{subject.batch_count}</td>
              <td>
                <button onClick={() => openModal(subject)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateSubjectModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreate}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        subjectName={subjectToDelete ? subjectToDelete.name : ''}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

      <LoadModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)} // Close the load modal
        loadData={loadData} // Pass the load data to the modal
      />
    </>
  );
};

export default SubjectsTable;