import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLectureDate, saveLectureDate } from './LectureDateService';

function EditLectureDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const lectureDate = await fetchLectureDate(id);
        setStartDate(lectureDate.startDate);
        setEndDate(lectureDate.endDate);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [id]);

  async function save(e) {
    e.preventDefault();
    const lectureDate = { id, startDate, endDate };
    await saveLectureDate(lectureDate);
    navigator('/admin/lecturedates');
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Edit Lecture Date</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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

export default EditLectureDate;