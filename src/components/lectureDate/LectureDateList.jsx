import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { deleteLectureDate, fetchLectureDates } from "./LectureDateService";

function LectureDateList() {
  const [lectureDates, setLectureDates] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  async function findAll() {
    try {
      const responseJson = await fetchLectureDates();
      setLectureDates(responseJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addLectureDate() {
    navigator("/admin/add-lecturedate");
  }

  async function deleteLectureDateById(id) {
    await deleteLectureDate(id);
    findAll();
  }

  // Formatiert das Datum inklusive Wochentag (Deutsch)
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Berechnet die Dauer in Minuten zwischen zwei Datumswerten
  function calculateDuration(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const diffInMs = end - start;
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));
    return diffInMinutes;
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Lecture Dates</h2>
            <button
              onClick={addLectureDate}
              className="btn btn-primary"
              type="submit"
              id="btnTopAction"
            >
              + Add Lecture Date
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
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration (min)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lectureDates.map((lectureDate) => (
                    <tr key={lectureDate.id}>
                      <td>{formatDate(lectureDate.startDate)}</td>
                      <td>{formatDate(lectureDate.endDate)}</td>
                      <td>
                        {calculateDuration(
                          lectureDate.startDate,
                          lectureDate.endDate
                        )}{" "}
                        min
                      </td>
                      <td className="right-align-content">
                        <button
                          onClick={() =>
                            navigator(
                              `/admin/edit-lecturedate/${lectureDate.id}`
                            )
                          }
                          className="btn btn-primary btn-small"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteLectureDateById(lectureDate.id)}
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

export default LectureDateList;
