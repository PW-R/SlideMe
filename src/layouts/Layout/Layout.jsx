import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";  // Adjust the path to match the folder structure
import Header from '../Header/Header'; 
import Footer from '../Footer/Footer'; 
import './Layout.css';  // Keep your styles here

const Layout = ({ tab, setTab }) => {
  return (
    <div>
      <Header />  
      <Navbar tab={tab} setTab={setTab} /> 
      <Outlet />
      <Footer />  
    </div>
  );
}

export default Layout;
