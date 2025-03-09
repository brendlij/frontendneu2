import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLecture, fetchLectures } from "./LectureService";

function LectureList() {
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLectures();
        setLectures(data);
      } catch (error) {
        console.error("Error fetching lectures:", error.message);
      }
    }
    loadData();
  }, []);

  async function deleteLectureById(id) {
    try {
      await deleteLecture(id);
      const data = await fetchLectures();
      setLectures(data);
    } catch (error) {
      console.error("Error deleting lecture:", error.message);
    }
  }

  function addLecture() {
    navigate("/admin/add-lecture");
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Lectures</h2>
            <button
              onClick={addLecture}
              className="btn btn-primary"
              type="submit"
              id="btnTopAction"
            >
              + Add Lecture
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
                    <th>Lecture Name</th>
                    <th>Module Name</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lectures.map((lecture) => (
                    <tr key={lecture.id}>
                      <td>{lecture.lectureName}</td>
                      <td>{lecture.modulName}</td>
                      <td>{lecture.duration}</td>
                      <td className="right-align-content">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-lecture/${lecture.id}`)
                          }
                          className="btn btn-primary btn-small"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteLectureById(lecture.id)}
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

export default LectureList;
