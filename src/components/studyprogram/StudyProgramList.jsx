import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchStudyPrograms,
  fetchStudyProgram,
  deleteStudyProgram,
} from "./StudyProgramService";
import { saveLecture } from "../lecture/LectureService";
import { saveLecturer } from "../lecturer/LecturerService";

function StudyProgramList() {
  const [studyPrograms, setStudyPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  async function findAll() {
    try {
      const responseJson = await fetchStudyPrograms();
      setStudyPrograms(responseJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addStudyProgram() {
    navigate("/admin/add-study-program");
  }

  /**
   * Löscht das StudyProgram und legt die zugeordneten Lectures/Lecturers
   * als neue Einträge mit studyProgram=null an.
   */
  async function deleteProgramAndKeepLecturesLecturers(id) {
    try {
      // 1) Hole das vollständige StudyProgram
      const sp = await fetchStudyProgram(id);
      // 2) Extrahiere Lectures und Lecturers
      const storedLectures = sp.lectures || [];
      const storedLecturers = sp.lecturers || [];

      // 3) StudyProgram löschen (Backend löscht auch die Verknüpfungen)
      await deleteStudyProgram(id);

      // 4) Für jede Lecture: Neue Lecture ohne ID anlegen, studyProgram=null
      for (const lecture of storedLectures) {
        // Aus dem alten Lecture-Objekt die ID entfernen, damit das Backend eine neue ID vergibt
        const { id, ...lectureData } = lecture;
        // Setze studyProgram explizit auf null, damit es nicht wieder verknüpft wird
        lectureData.studyProgram = null;
        // Neue Lecture speichern
        await saveLecture(lectureData);
      }

      // 5) Für jeden Lecturer: Neuer Lecturer ohne ID, studyProgram=null
      for (const lecturer of storedLecturers) {
        const { id, ...lecturerData } = lecturer;
        lecturerData.studyProgram = null;
        await saveLecturer(lecturerData);
      }

      // 6) Liste neu laden, damit man sieht, dass die Lectures/Lecturers jetzt "allein" dastehen
      findAll();
    } catch (err) {
      console.error("Fehler beim Löschen & Neu-Anlegen:", err);
      alert("Fehler: " + err.message);
    }
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Study Programs</h2>
            <button
              onClick={addStudyProgram}
              className="btn btn-primary"
              type="button"
              id="btnTopAction"
            >
              + Add Study Program
            </button>
          </div>
          <div
            className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto"
            id="contentCard"
          >
            <div className="d-flex text-muted">
              <table className="table table-hover table-responsive table-alignment">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Lectures</th>
                    <th>Lecturers</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studyPrograms.map((studyProgram) => (
                    <tr key={studyProgram.id}>
                      <td>{studyProgram.name}</td>
                      <td>{studyProgram.shortName}</td>
                      <td>
                        {studyProgram.lectures?.map((lecture) => (
                          <div key={lecture.id}>{lecture.lectureName}</div>
                        ))}
                      </td>
                      <td>
                        {studyProgram.lecturers?.map((lecturer) => (
                          <div key={lecturer.id}>
                            {lecturer.firstName} {lecturer.lastName}
                          </div>
                        ))}
                      </td>
                      <td className="right-align-content">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/edit-study-program/${studyProgram.id}`
                            )
                          }
                          className="btn btn-primary btn-small"
                        >
                          Edit
                        </button>
                        {/* Neuer Button, der den "Keep" Prozess auslöst */}
                        <button
                          onClick={() =>
                            deleteProgramAndKeepLecturesLecturers(
                              studyProgram.id
                            )
                          }
                          className="btn btn-danger btn-small ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StudyProgramList;
