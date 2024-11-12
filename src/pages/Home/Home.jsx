import React from 'react';
import { Button } from 'react-bootstrap';
import Navbar from '../../layouts/Navbar/Navbar'; // Assuming Navbar is set up correctly
import './Home.css';  // Add your custom styles here

const Home = ({ tab, setTab }) => {
  return (
    <div className="home-page">
      {/* Green Bar */}
      <div className="green-bar">
        <Navbar tab={tab} setTab={setTab} />
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <h1>Welcome to the Dashboard!</h1>
        <p>Here’s where you can manage your content, settings, and more.</p>

        {/* Main Button */}
        <Button className="main-action-btn" variant="success">
          Take Action
        </Button>
      </div>
    </div>
  );
};

export default Home;
