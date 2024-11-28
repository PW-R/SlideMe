import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";  // Adjust the path to match the folder structure
import './Layout.css';  // Keep your styles here

const Layout = ({ tab, setTab }) => {
  return (
    <div>
      <Navbar tab={tab} setTab={setTab} /> 
      <Outlet />
    </div>
  );
}

export default Layout;
