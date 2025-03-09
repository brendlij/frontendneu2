import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

function SidebarComponent() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  function activateSidebarLink(e, id) {
    const linkElement = document.getElementById(id);
    const sidebarLinks = document.getElementsByClassName("nav-link");
    Array.from(sidebarLinks).forEach((element) =>
      element.classList.remove("active")
    );
    if (linkElement) {
      linkElement.classList.add("active");
    }
  }

  return (
    <aside
      className="sidebar bg-body d-flex flex-column justify-content-between pt-3 ms-3"
      style={{ height: "90vh" }}
    >
      <ul className="nav sidebar-list align-items-start text-start mb-auto">
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnStudiengaenge")}
            to="/admin/studyprograms"
            className="nav-link"
            id="btnStudiengaenge"
          >
            <i className="fs-4 bi-speedometer2 sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Study Programs</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnLecturers")}
            to="/admin/lecturers"
            className="nav-link"
            id="btnLecturers"
          >
            <i className="fs-6 bi-people sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Lecturers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnLectures")}
            to="/admin/lectures"
            className="nav-link"
            id="btnLectures"
          >
            <i className="fs-6 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Lectures</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnLectureDates")}
            to="/admin/lecturedates"
            className="nav-link"
            id="btnLectureDates"
          >
            <i className="fs-6 bi-calendar sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Lecture Dates</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnSemesters")}
            to="/admin/semesters"
            className="nav-link"
            id="btnSemesters"
          >
            <i className="fs-6 bi-grid sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Semesters</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={(e) => activateSidebarLink(e, "btnStudyClasses")}
            to="/admin/studyclasses"
            className="nav-link"
            id="btnStudyClasses"
          >
            <i className="fs-6 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Study Classes</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarComponent;
