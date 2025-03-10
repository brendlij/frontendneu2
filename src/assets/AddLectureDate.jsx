import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveLectureDate } from './LectureDateService';
import { fetchLecturers } from '../lecturer/LecturerService';
import { fetchLectures } from '../lecture/LectureService';
import { fetchSemesters } from '../semester/SemesterService';

function AddLectureDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [lectureId, setLectureId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [lecturers, setLecturers] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const lecturersData = await fetchLecturers();
      const lecturesData = await fetchLectures();
      const semestersData = await fetchSemesters();
      setLecturers(lecturersData);
      setLectures(lecturesData);
      setSemesters(semestersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function save(e) {
    e.preventDefault();
  
    // Validate that all fields are selected
    if (!lecturerId || !lectureId || !semesterId) {
      alert('Please select a lecturer, lecture, and semester.');
      return;
    }
  
    const lectureDate = { startDate, endDate, lecturerId, lectureId, semesterId };
    console.log('Data being sent to the backend:', lectureDate); // Debugging line
  
    try {
      await saveLectureDate(lectureDate);
      navigator('/admin/lecturedates');
    } catch (error) {
      console.error('Error saving lecture date:', error);
      alert('Failed to save lecture date. Please try again.');
    }
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Add Lecture Date</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lecturer</label>
                <select
                  className="form-control"
                  value={lecturerId}
                  onChange={(e) => setLecturerId(e.target.value)}
                  required
                >
                  <option value="">Select Lecturer</option>
                  {lecturers.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.firstName} {lecturer.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Lecture</label>
                <select
                  className="form-control"
                  value={lectureId}
                  onChange={(e) => setLectureId(e.target.value)}
                  required
                >
                  <option value="">Select Lecture</option>
                  {lectures.map((lecture) => (
                    <option key={lecture.id} value={lecture.id}>
                      {lecture.lectureName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Semester</label>
                <select
                  className="form-control"
                  value={semesterId}
                  onChange={(e) => setSemesterId(e.target.value)}
                  required
                >
                  <option value="">Select Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {semester.name}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={save} type="button" className="btn btn-primary" id="btnFormSubmit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddLectureDate;