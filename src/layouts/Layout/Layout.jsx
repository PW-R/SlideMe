
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import './Layout.css'; // Assuming you have CSS for Layout

const Layout = ({ tab, setTab }) => {
  return (
    <div>
      <Header />  {/* Include Header */}
      <Navbar tab={tab} setTab={setTab} /> {/* Include Navbar */}
      <Outlet />  {/* Render nested routes */}
      <Footer />  {/* Include Footer */}
    </div>
  );
}

export default Layout;
