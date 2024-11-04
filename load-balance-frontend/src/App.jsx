import { useState, useEffect } from 'react';
import SubjectsTable from './components/SubjectsTable'; // Import the SubjectsTable component

function App() {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null); // State for selected semester ID

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch('http://localhost:3000/semesters');
        const data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }, []);

  const handleSemesterChange = (event) => {
    setSelectedSemesterId(event.target.value); // Update selected semester ID
  };

  return (
    <>
      <h1>Select a Semester</h1>
      <select onChange={handleSemesterChange} value={selectedSemesterId || ''}>
        <option value="">Select a semester</option>
        {semesters.map(semester => (
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>

      {selectedSemesterId && <SubjectsTable semesterId={selectedSemesterId} />} {/* Render SubjectsTable if a semester is selected */}
    </>
  );
}

export default App;