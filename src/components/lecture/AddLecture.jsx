import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveLecture } from './LectureService';

function AddLecture() {
  const [lectureName, setLectureName] = useState('');
  const [modulName, setModulName] = useState('');
  const [duration, setDuration] = useState('');
  const navigator = useNavigate();

  async function save(e) {
    e.preventDefault();
    const lecture = { lectureName, modulName, duration };
    await saveLecture(lecture);
    navigator('/admin/lectures');
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Add Lecture</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Lecture Name</label>
                <input type="text" className="form-control" value={lectureName} onChange={(e) => setLectureName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Module Name</label>
                <input type="text" className="form-control" value={modulName} onChange={(e) => setModulName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input type="number" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              </div>
              <button onClick={save} type="button" className="btn btn-primary" id="btnFormSubmit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddLecture;