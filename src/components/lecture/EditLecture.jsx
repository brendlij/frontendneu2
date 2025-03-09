import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLecture, saveLecture } from './LectureService';

function EditLecture() {
  const [lectureName, setLectureName] = useState('');
  const [modulName, setModulName] = useState('');
  const [duration, setDuration] = useState('');
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const lecture = await fetchLecture(id);
        setLectureName(lecture.lectureName);
        setModulName(lecture.modulName);
        setDuration(lecture.duration);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [id]);

  async function save(e) {
    e.preventDefault();
    const lecture = { id, lectureName, modulName, duration };
    await saveLecture(lecture);
    navigator('/admin/lectures');
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Edit Lecture</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Lecture Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Module Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={modulName}
                  onChange={(e) => setModulName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input
                  type="number"
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
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

export default EditLecture;