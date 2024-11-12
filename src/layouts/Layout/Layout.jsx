
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 
import Header from './Header'; 
import Footer from './Footer'; 
import './Layout.css'; 

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
