import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { deleteStudyProgram, fetchStudyPrograms } from './StudyProgramService';

function StudyProgramList() {
  const [studyPrograms, setStudyPrograms] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    findAll();
  }, []);

  async function findAll() {
    try {
      const responseJson = await fetchStudyPrograms();
      setStudyPrograms(responseJson);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addStudyProgram() {
    navigator('/admin/add-study-program');
  }

  async function deleteProgram(id) {
    await deleteStudyProgram(id);
    findAll();
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Study Programs</h2>
            <button onClick={addStudyProgram} className="btn btn-primary" type="submit" id="btnTopAction">+ Add Study Program</button>
          </div>
          <div className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto" id="contentCard">
            <div className="d-flex text-muted">
              <table className='table table-hover table-responsive table-alignment'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Lectures</th>
                    <th>Lecturers</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studyPrograms.map(studyProgram => (
                    <tr key={studyProgram.id}>
                      <td>{studyProgram.name}</td>
                      <td>{studyProgram.shortName}</td>
                      <td>
                        {studyProgram.lectures && studyProgram.lectures.map(lecture => (
                          <div key={lecture.id}>{lecture.lectureName}</div>
                        ))}
                      </td>
                      <td>
                        {studyProgram.lecturers && studyProgram.lecturers.map(lecturer => (
                          <div key={lecturer.id}>{lecturer.firstName} {lecturer.lastName}</div>
                        ))}
                      </td>
                      <td className='right-align-content'>
                        <button onClick={() => navigator(`/admin/edit-study-program/${studyProgram.id}`)} className='btn btn-primary btn-small'>Edit</button>
                        <button onClick={() => deleteProgram(studyProgram.id)} className='btn btn-danger btn-small ms-2'>Delete</button>
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

export default StudyProgramList;