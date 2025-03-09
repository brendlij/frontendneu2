import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSemester, saveSemester } from './SemesterService';

function EditSemester() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const semester = await fetchSemester(id);
        setStartDate(semester.startDate);
        setEndDate(semester.endDate);
        setNumber(semester.number);
        setName(semester.name);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [id]);

  async function save(e) {
    e.preventDefault();
    const semester = { id, startDate, endDate, number, name };
    await saveSemester(semester);
    navigator('/admin/semesters');
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Edit Semester</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Semester Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Semester Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default EditSemester;