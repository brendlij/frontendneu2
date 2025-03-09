import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import HomeView from './components/HomeView';
import AdminView from './components/AdminView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyProgramList from './components/studyprogram/StudyProgramList';
import AddStudyProgram from './components/studyprogram/AddStudyProgram';
import LecturerList from './components/lecturer/LecturerList';
import AddLecturer from './components/lecturer/AddLecturer';
import LectureList from './components/lecture/LectureList';
import AddLecture from './components/lecture/AddLecture';
import LectureDateList from './components/lectureDate/LectureDateList';
import AddLectureDate from './components/lectureDate/AddLectureDate';
import SemesterList from './components/semester/SemesterList';
import AddSemester from './components/semester/AddSemester';
import StudyClassList from './components/studyclass/StudyClassList';
import AddStudyClass from './components/studyclass/AddStudyClass';

import EditLecture from './components/lecture/EditLecture';
import EditSemester from './components/semester/EditSemester';
import EditStudyClass from './components/studyclass/EditStudyClass';
import EditLecturer from './components/lecturer/EditLecturer';
import EditLectureDate from './components/lectureDate/EditLectureDate';
import EditStudyProgram from './components/studyprogram/EditStudyProgram';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminView />} >
          <Route index element={<StudyProgramList />} />
          <Route path="/admin/studyprograms" element={<StudyProgramList />} />
          <Route path="/admin/add-study-program" element={<AddStudyProgram />} />
          <Route path="/admin/lecturers" element={<LecturerList />} />
          <Route path="/admin/add-lecturer" element={<AddLecturer />} />
          <Route path="/admin/lectures" element={<LectureList />} />
          <Route path="/admin/add-lecture" element={<AddLecture />} />
          <Route path="/admin/lecturedates" element={<LectureDateList />} />
          <Route path="/admin/add-lecturedate" element={<AddLectureDate />} />
           <Route path="/admin/semesters" element={<SemesterList />} />
          <Route path="/admin/add-semester" element={<AddSemester />} /> 
          <Route path="/admin/studyclasses" element={<StudyClassList />} />
          <Route path="/admin/add-studyclass" element={<AddStudyClass />} />

          <Route path="/admin/edit-lecture/:id" element={<EditLecture />} />
          <Route path="/admin/edit-semester/:id" element={<EditSemester />} />
          <Route path="/admin/edit-studyclass/:id" element={<EditStudyClass />} />
          <Route path="/admin/edit-lecturer/:id" element={<EditLecturer />} />
          <Route path="/admin/edit-lecturedate/:id" element={<EditLectureDate />} />
          <Route path="/admin/edit-study-program/:id" element={<EditStudyProgram />} />      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;