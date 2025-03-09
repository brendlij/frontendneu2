import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteLecturer, fetchLecturers } from './LecturerService';

function LecturerList() {
  const [lecturers, setLecturers] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  async function findAll() {
    try {
      const responseJson = await fetchLecturers();
      setLecturers(responseJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addLecturer() {
    navigator('/admin/add-lecturer');
  }

  async function deleteLecturerById(id) {
    await deleteLecturer(id);
    findAll();
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Lecturers</h2>
            <button onClick={addLecturer} className="btn btn-primary" type="submit" id="btnTopAction">+ Add Lecturer</button>
          </div>
          <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
            <div className="d-flex text-muted">
              <table className='table table-hover table-responsive table-alignment'>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map(lecturer => (
                    <tr key={lecturer.id}>
                      <td>{lecturer.firstName}</td>
                      <td>{lecturer.lastName}</td>
                      <td>{lecturer.email}</td>
                      <td className='right-align-content'>
                        <button onClick={() => navigator(`/admin/edit-lecturer/${lecturer.id}`)} className='btn btn-primary btn-small'>Edit</button>
                        <button onClick={() => deleteLecturerById(lecturer.id)} className='btn btn-danger btn-small ms-2'>Delete</button>
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