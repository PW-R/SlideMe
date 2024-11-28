import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [tab, setTab] = useState('map-created-position'); // Track the active tab
  const navigate = useNavigate(); // Navigate for routing

  return (
    <div className="home-page">
      <div className="main-content">
        <h1>Welcome to Slide Me!</h1>
        <p>Choose your next action below.</p>

        {/* Button Section */}
        <div className="homepage-3button">
          <div className="map-2button-container">
            <i className="bi bi-clock-history"></i>
            <button className="map-2button">
              Homecar-อู่รถมั่นคง
            </button>
          </div>
          <div className="map-2button-container">
            <i className="bi bi-clock-history"></i>
            <button className="map-2button">
              Homecar-ร้านจันทร์ฉาย
            </button>
          </div>
        </div>

        {/* Search Link */}
        <div className="go-search">
          <Button
            variant="outline-success"
            onClick={() => navigate('/search')}
            className={'btn ' + (tab === 'search' ? 'btn-success' : 'btn-outline-success')}
          >
            ไปหน้าค้นหาสไลด์มี
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
