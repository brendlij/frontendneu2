import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteLecturer,
  fetchLecturers,
  fetchLecturer,
} from "./LecturerService";

function LecturerList() {
  const [lecturers, setLecturers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // fetchLecturers liefert gemischte Daten, z. B.:
      // [ { id: 57, firstName: "Hans", ...}, 58, 59 ]
      const data = await fetchLecturers();

      const fullLecturers = await Promise.all(
        data.map(async (item) => {
          if (typeof item === "number") {
            return await fetchLecturer(item);
          }
          return item;
        })
      );
      setLecturers(fullLecturers);
    } catch (error) {
      console.error("Error fetching lecturers:", error.message);
    }
  }

  async function deleteLecturerById(id) {
    try {
      await deleteLecturer(id);
      await loadData(); // Liste neu laden
    } catch (error) {
      console.error("Error deleting lecturer:", error.message);
    }
  }

  function addLecturer() {
    navigate("/admin/add-lecturer");
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Lecturers</h2>
            <button
              onClick={addLecturer}
              className="btn btn-primary"
              type="button"
              id="btnTopAction"
            >
              + Add Lecturer
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map((lecturer) => (
                    <tr key={lecturer.id}>
                      <td>{lecturer.firstName}</td>
                      <td>{lecturer.lastName}</td>
                      <td>{lecturer.email}</td>
                      <td className="right-align-content">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-lecturer/${lecturer.id}`)
                          }
                          className="btn btn-primary btn-small"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteLecturerById(lecturer.id)}
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

export default LecturerList;
