import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveStudyProgram,
  fetchLectures,
  fetchLecturers,
  addLectureToStudyProgram,
  addLecturerToStudyProgram,
} from "./StudyProgramService";

function AddStudyProgram() {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [lectures, setLectures] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [selectedLecturers, setSelectedLecturers] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchLectures().then((data) => setLectures(data));
    fetchLecturers().then((data) => setLecturers(data));
  }, []);

  async function save(e) {
    e.preventDefault();
    const studyProgram = { name, shortName };

    try {
      // Save the study program and get the response
      const savedStudyProgram = await saveStudyProgram(studyProgram);
      const studyProgramId = savedStudyProgram.id;

      // Add selected lectures to the study program
      for (const lectureId of selectedLectures) {
        await addLectureToStudyProgram(studyProgramId, lectureId);
      }

      // Add selected lecturers to the study program
      for (const lecturerId of selectedLecturers) {
        await addLecturerToStudyProgram(studyProgramId, lecturerId);
      }

      // Navigate to the study programs list after successful save
      navigator("/admin/studyprograms");
    } catch (error) {
      console.error("Error saving study program:", error);
      alert(
        "Failed to save study program. Please check the console for details."
      );
    }
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Add Study Program</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Short Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lectures</label>
                <select
                  multiple
                  className="form-control"
                  value={selectedLectures}
                  onChange={(e) =>
                    setSelectedLectures(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {lectures.map((lecture) => (
                    <option key={lecture.id} value={lecture.id}>
                      {lecture.lectureName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Lecturers</label>
                <select
                  multiple
                  className="form-control"
                  value={selectedLecturers}
                  onChange={(e) =>
                    setSelectedLecturers(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {lecturers.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.firstName} {lecturer.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={save}
                type="button"
                className="btn btn-primary"
                id="btnFormSubmit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddStudyProgram;
