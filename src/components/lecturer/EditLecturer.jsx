import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLecturer, saveLecturer } from './LecturerService';

function EditLecturer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const lecturer = await fetchLecturer(id);
        setFirstName(lecturer.firstName);
        setLastName(lecturer.lastName);
        setEmail(lecturer.email);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [id]);

  async function save(e) {
    e.preventDefault();
    const lecturer = { id, firstName, lastName, email };
    await saveLecturer(lecturer);
    navigator('/admin/lecturers');
  }

  return (
    <main className='content'>
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Edit Lecturer</h2>
          </div>
          <div className="d-flex text-muted text-start">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

export default EditLecturer;