import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteStudyClass, fetchStudyClasses } from './StudyClassService';

function StudyClassList() {
  const [studyClasses, setStudyClasses] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  async function findAll() {
    try {
      const responseJson = await fetchStudyClasses();
      setStudyClasses(responseJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addStudyClass() {
    navigator('/admin/add-studyclass');
  }

  async function deleteStudyClassById(id) {
    await deleteStudyClass(id);
    findAll();
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Study Classes</h2>
            <button onClick={addStudyClass} className="btn btn-primary" type="submit" id="btnTopAction">+ Add Study Class</button>
          </div>
          <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
            <div className="d-flex text-muted">
              <table className='table table-hover table-responsive table-alignment'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studyClasses.map(studyClass => (
                    <tr key={studyClass.id}>
                      <td>{studyClass.name}</td>
                      <td>{studyClass.startDate}</td>
                      <td>{studyClass.endDate}</td>
                      <td className='right-align-content'>
                        <button onClick={() => navigator(`/admin/edit-studyclass/${studyClass.id}`)} className='btn btn-primary btn-small'>Edit</button>
                        <button onClick={() => deleteStudyClassById(studyClass.id)} className='btn btn-danger btn-small ms-2'>Delete</button>
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

export default StudyClassList;