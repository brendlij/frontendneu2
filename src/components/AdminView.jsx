
import React from 'react';
import AdminNavbar from "./AdminNavbar";
import SidebarComponent from "./SidebarComponent";
import Footer from "./Footer";

import { Link, Outlet } from "react-router-dom";


function AdminView() {
  return (

    <div className="page-container w-100">
      <AdminNavbar />
      <div className="content-container mt-5 w-100">
        <SidebarComponent />
        <Outlet />
      </div>
      <Footer />
    </div >
  );
}

export default AdminView;
