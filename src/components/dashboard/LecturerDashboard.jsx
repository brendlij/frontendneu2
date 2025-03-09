import React, { useState, useEffect } from "react";
import { fetchLecturers } from "../lecturer/LecturerService";
import { fetchStudyPrograms } from "../studyprogram/StudyProgramService";
import "bootstrap-icons/font/bootstrap-icons.css";

function LecturerDashboard() {
  const [lecturers, setLecturers] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const lecturersData = await fetchLecturers();
      const studyProgramsData = await fetchStudyPrograms();
      setLecturers(lecturersData);
      setStudyPrograms(studyProgramsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLecturerChange = (e) => {
    const lecturerId = e.target.value;
    const lecturer = lecturers.find((l) => l.id === parseInt(lecturerId));
    setSelectedLecturer(lecturer || null);
  };

  const getLecturerStudyPrograms = () => {
    if (!selectedLecturer) return [];
    return studyPrograms.filter((program) =>
      program.lecturers.some((lecturer) => lecturer.id === selectedLecturer.id)
    );
  };

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Lecturer Dashboard</h2>
          </div>

          {/* Lecturer Filter Dropdown */}
          <div className="mb-4">
            <label htmlFor="lecturerFilter" className="form-label">
              Select Lecturer:
            </label>
            <select
              id="lecturerFilter"
              className="form-select"
              value={selectedLecturer ? selectedLecturer.id : ""}
              onChange={handleLecturerChange}
            >
              <option value="">Select a Lecturer</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.firstName} {lecturer.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Lecturer Details Card */}
          {selectedLecturer && (
            <div className="card mb-4">
              <div className="card-header primary-color text-white">
                <h5 className="card-title mb-0">Lecturer Details</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Name:</strong> {selectedLecturer.firstName}{" "}
                  {selectedLecturer.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedLecturer.email}
                </p>
              </div>
            </div>
          )}

          {/* Assigned Study Programs Card */}
          {selectedLecturer && (
            <div className="card">
              <div className="card-header primary-color text-white">
                <h5 className="card-title mb-0">Assigned Study Programs</h5>
              </div>
              <div className="card-body">
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Short Name</th>
                      <th>Lectures</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLecturerStudyPrograms().map((program) => (
                      <tr key={program.id}>
                        <td>{program.name}</td>
                        <td>{program.shortName}</td>
                        <td>
                          {program.lectures.map((lecture) => (
                            <div key={lecture.id}>{lecture.lectureName}</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default LecturerDashboard;
