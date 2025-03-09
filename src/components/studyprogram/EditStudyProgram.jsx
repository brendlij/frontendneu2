import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchStudyProgram,
  saveStudyProgram,
  fetchLectures,
  fetchLecturers,
  addLectureToStudyProgram,
  addLecturerToStudyProgram,
  removeLectureFromStudyProgram,
  removeLecturerFromStudyProgram,
} from "./StudyProgramService";

function EditStudyProgram() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");

  // Optionslisten
  const [lectures, setLectures] = useState([]);
  const [lecturersData, setLecturersData] = useState([]);

  // Ausgewählte IDs
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [selectedLecturers, setSelectedLecturers] = useState([]);

  // Initiale Zuordnungen speichern
  const [initialSelectedLectures, setInitialSelectedLectures] = useState([]);
  const [initialSelectedLecturers, setInitialSelectedLecturers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const studyProgram = await fetchStudyProgram(id);
        setName(studyProgram.name);
        setShortName(studyProgram.shortName);
        if (studyProgram.lectures && studyProgram.lectures.length > 0) {
          const lectureIds = studyProgram.lectures.map((lecture) =>
            String(lecture.id)
          );
          setSelectedLectures(lectureIds);
          setInitialSelectedLectures(lectureIds);
        }
        if (studyProgram.lecturers && studyProgram.lecturers.length > 0) {
          const lecturerIds = studyProgram.lecturers.map((lecturer) =>
            String(lecturer.id)
          );
          setSelectedLecturers(lecturerIds);
          setInitialSelectedLecturers(lecturerIds);
        }
      } catch (error) {
        console.error("Error fetching study program:", error.message);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchLectures()
      .then((data) => setLectures(data))
      .catch((error) =>
        console.error("Error fetching lectures:", error.message)
      );

    fetchLecturers()
      .then((data) => setLecturersData(data))
      .catch((error) =>
        console.error("Error fetching lecturers:", error.message)
      );
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    const studyProgram = { id, name, shortName };
    try {
      const updatedStudyProgram = await saveStudyProgram(studyProgram);
      const spId = updatedStudyProgram.id;

      // Berechne, welche Lectures entfernt wurden:
      const lecturesToRemove = initialSelectedLectures.filter(
        (id) => !selectedLectures.includes(id)
      );
      // Füge neue hinzu:
      const lecturesToAdd = selectedLectures.filter(
        (id) => !initialSelectedLectures.includes(id)
      );

      for (const lectureId of lecturesToRemove) {
        await removeLectureFromStudyProgram(spId, lectureId);
      }
      for (const lectureId of lecturesToAdd) {
        await addLectureToStudyProgram(spId, lectureId);
      }

      // Analog für Lecturers:
      const lecturersToRemove = initialSelectedLecturers.filter(
        (id) => !selectedLecturers.includes(id)
      );
      const lecturersToAdd = selectedLecturers.filter(
        (id) => !initialSelectedLecturers.includes(id)
      );
      for (const lecturerId of lecturersToRemove) {
        await removeLecturerFromStudyProgram(spId, lecturerId);
      }
      for (const lecturerId of lecturersToAdd) {
        await addLecturerToStudyProgram(spId, lecturerId);
      }

      navigate("/admin/studyprograms");
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
            <h2 id="contentTitle">Edit Study Program</h2>
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
                    <option key={lecture.id} value={String(lecture.id)}>
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
                  {lecturersData.map((lecturer) => (
                    <option key={lecturer.id} value={String(lecturer.id)}>
                      {lecturer.firstName} {lecturer.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSave}
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

export default EditStudyProgram;
