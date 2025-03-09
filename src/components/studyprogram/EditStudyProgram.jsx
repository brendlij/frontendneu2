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

  // Felder des StudyProgram
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");

  // Optionen (alle Vorlesungen/Dozenten)
  const [lectures, setLectures] = useState([]);
  const [lecturersData, setLecturersData] = useState([]);

  // Zustände für die ausgewählten IDs (als Strings)
  const [selectedLectureIds, setSelectedLectureIds] = useState([]);
  const [selectedLecturerIds, setSelectedLecturerIds] = useState([]);

  // Zustände für die initialen Zuordnungen (für den Vergleich beim Speichern)
  const [initialSelectedLectureIds, setInitialSelectedLectureIds] = useState(
    []
  );
  const [initialSelectedLecturerIds, setInitialSelectedLecturerIds] = useState(
    []
  );

  // Laden des bestehenden StudyProgram inklusive Transformation der Referenzen
  useEffect(() => {
    async function fetchData() {
      try {
        const studyProgram = await fetchStudyProgram(id);
        console.log("Fetched study program from backend:", studyProgram);

        // Name und ShortName übernehmen
        setName(studyProgram.name);
        setShortName(studyProgram.shortName);

        // Vorlesungen (lectures):
        let lectureIds = [];
        if (studyProgram.lectures && studyProgram.lectures.length > 0) {
          // Prüfen, ob das erste Element eine Zahl ist (also nur ID)
          if (typeof studyProgram.lectures[0] === "number") {
            // Hole alle vollständigen Vorlesungen und erstelle ein Lookup
            const allLectures = await fetchLectures();
            const lecturesLookup = allLectures.reduce((acc, lecture) => {
              acc[lecture.id] = lecture;
              return acc;
            }, {});
            lectureIds = studyProgram.lectures.map((lectureId) =>
              String(lecturesLookup[lectureId]?.id)
            );
          } else {
            // Es sind bereits vollständige Objekte
            lectureIds = studyProgram.lectures.map((lecture) =>
              String(lecture.id)
            );
          }
          console.log("Lecture IDs found:", lectureIds);
          setSelectedLectureIds(lectureIds);
          setInitialSelectedLectureIds(lectureIds);
        } else {
          setSelectedLectureIds([]);
          setInitialSelectedLectureIds([]);
        }

        // Dozenten (lecturers):
        let lecturerIds = [];
        if (studyProgram.lecturers && studyProgram.lecturers.length > 0) {
          if (typeof studyProgram.lecturers[0] === "number") {
            const allLecturers = await fetchLecturers();
            const lecturersLookup = allLecturers.reduce((acc, lecturer) => {
              acc[lecturer.id] = lecturer;
              return acc;
            }, {});
            lecturerIds = studyProgram.lecturers.map((lecturerId) =>
              String(lecturersLookup[lecturerId]?.id)
            );
          } else {
            lecturerIds = studyProgram.lecturers.map((lecturer) =>
              String(lecturer.id)
            );
          }
          console.log("Lecturer IDs found:", lecturerIds);
          setSelectedLecturerIds(lecturerIds);
          setInitialSelectedLecturerIds(lecturerIds);
        } else {
          setSelectedLecturerIds([]);
          setInitialSelectedLecturerIds([]);
        }
      } catch (error) {
        console.error("Error fetching study program:", error.message);
      }
    }
    fetchData();
  }, [id]);

  // Laden aller verfügbaren Vorlesungen und Dozenten für die Select-Listen
  useEffect(() => {
    fetchLectures()
      .then((data) => {
        console.log("Fetched lectures (all):", data);
        setLectures(data);
      })
      .catch((error) =>
        console.error("Error fetching lectures:", error.message)
      );

    fetchLecturers()
      .then((data) => {
        console.log("Fetched lecturers (all):", data);
        setLecturersData(data);
      })
      .catch((error) =>
        console.error("Error fetching lecturers:", error.message)
      );
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    const studyProgram = { id, name, shortName };
    console.log("Saving study program:", studyProgram);

    try {
      // Update StudyProgram (nur Name/ShortName – Merge-Update im Backend)
      const updatedStudyProgram = await saveStudyProgram(studyProgram);
      const spId = updatedStudyProgram.id;
      console.log("Study program saved with ID:", spId);

      // Vorlesungen aktualisieren:
      const lecturesToRemove = initialSelectedLectureIds.filter(
        (oldId) => !selectedLectureIds.includes(oldId)
      );
      const lecturesToAdd = selectedLectureIds.filter(
        (newId) => !initialSelectedLectureIds.includes(newId)
      );
      console.log("Lectures to remove:", lecturesToRemove);
      console.log("Lectures to add:", lecturesToAdd);

      for (const lectureId of lecturesToRemove) {
        console.log(`Removing lecture ${lectureId} from study program ${spId}`);
        await removeLectureFromStudyProgram(spId, lectureId);
      }
      for (const lectureId of lecturesToAdd) {
        console.log(`Adding lecture ${lectureId} to study program ${spId}`);
        await addLectureToStudyProgram(spId, lectureId);
      }

      // Dozenten aktualisieren:
      const lecturersToRemove = initialSelectedLecturerIds.filter(
        (oldId) => !selectedLecturerIds.includes(oldId)
      );
      const lecturersToAdd = selectedLecturerIds.filter(
        (newId) => !initialSelectedLecturerIds.includes(newId)
      );
      console.log("Lecturers to remove:", lecturersToRemove);
      console.log("Lecturers to add:", lecturersToAdd);

      for (const lecturerId of lecturersToRemove) {
        console.log(
          `Removing lecturer ${lecturerId} from study program ${spId}`
        );
        await removeLecturerFromStudyProgram(spId, lecturerId);
      }
      for (const lecturerId of lecturersToAdd) {
        console.log(`Adding lecturer ${lecturerId} to study program ${spId}`);
        await addLecturerToStudyProgram(spId, lecturerId);
      }

      console.log("Update completed. Navigating back...");
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
                  value={selectedLectureIds}
                  onChange={(e) =>
                    setSelectedLectureIds(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {lectures.map((lecture, index) => {
                    // Wenn lecture ein Objekt ist, nutze lecture.id, sonst nimm die Zahl selbst
                    const key = lecture.id ? lecture.id : `lecture-${index}`;
                    const value = lecture.id
                      ? String(lecture.id)
                      : String(lecture);
                    const display = lecture.lectureName
                      ? lecture.lectureName
                      : `Lecture ${lecture}`;
                    return (
                      <option key={key} value={value}>
                        {display}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Lecturers</label>
                <select
                  multiple
                  className="form-control"
                  value={selectedLecturerIds}
                  onChange={(e) =>
                    setSelectedLecturerIds(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {lecturersData.map((lecturer, index) => {
                    const key = lecturer.id ? lecturer.id : `lecturer-${index}`;
                    const value = lecturer.id
                      ? String(lecturer.id)
                      : String(lecturer);
                    const display = lecturer.firstName
                      ? `${lecturer.firstName} ${lecturer.lastName}`
                      : `Lecturer ${lecturer}`;
                    return (
                      <option key={key} value={value}>
                        {display}
                      </option>
                    );
                  })}
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
