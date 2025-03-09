# React-Anwendung mit Bootstrap 
 - Formular für das Hinzufügen eines Studiengangs erstellen

 ```


import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate, useParams } from 'react-router-dom';
import { saveStudyProgram } from './StudyProgramService';


function AddStudyProgram() {

    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const navigator = useNavigate();


    function handleName(e) {
        setName(e.target.value);
    }
    function handleShortName(e) {
        setShortName(e.target.value);
    }



    async function save(e) {
        e.preventDefault();
        const studyProgram = { name, shortName };
        await saveStudyProgram(studyProgram);
        navigator('/admin/studyprograms');
    }



    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="bar d-flex justify-content-between mb-3 flex-row">
                        <h2 id="contentTitle">Studiengang hinzufügen</h2>
                    </div>

                    <div className="d-flex text-muted text-start">
                        <form className="w-100" id="form">
                            <div className="mb-3">
                                <label className="form-label">Abkürzung</label>
                                <input type="text" className="form-control" id="shortname" name="shortname" required="required"
                                    value={shortName}
                                    onChange={(e) => setShortName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bezeichnung</label>
                                <input type="text" className="form-control" id="name" name="name" required="required"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button onClick={save} type="button" className="btn btn-primary" id="btnFormSubmit">Speichern</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default AddStudyProgram;


 ```
 - Route für das Hinzufügen eines Studiengangs erstellen

 ```
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import HomeView from './components/HomeView';
import AdminView from './components/AdminView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyProgramList from './components/StuyProgramList';
import AddStudyProgram from './components/AddStudyProgram';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminView />} >
          <Route index element={<StudyProgramList />} />
          <Route path="/admin/studyprograms" element={<StudyProgramList />} />
          <Route path="/admin/add-study-program" element={<AddStudyProgram />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

 ```


