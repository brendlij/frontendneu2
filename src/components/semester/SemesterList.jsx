import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteSemester, fetchSemesters } from './SemesterService';

function SemesterList() {
  const [semesters, setSemesters] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  async function findAll() {
    try {
      const responseJson = await fetchSemesters();
      setSemesters(responseJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addSemester() {
    navigator('/admin/add-semester');
  }

  async function deleteSemesterById(id) {
    await deleteSemester(id);
    findAll();
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Semesters</h2>
            <button onClick={addSemester} className="btn btn-primary" type="submit" id="btnTopAction">
              + Add Semester
            </button>
          </div>
          <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
            <div className="d-flex text-muted">
              <table className='table table-hover table-responsive table-alignment'>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Semester Number</th>
                    <th>Semester Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map((semester) => (
                    <tr key={semester.id}>
                      <td>{semester.startDate}</td>
                      <td>{semester.endDate}</td>
                      <td>{semester.number}</td>
                      <td>{semester.name}</td>
                      <td className='right-align-content'>
                        <button
                          onClick={() => navigator(`/admin/edit-semester/${semester.id}`)}
                          className='btn btn-primary btn-small'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSemesterById(semester.id)}
                          className='btn btn-danger btn-small ms-2'
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

export default SemesterList;