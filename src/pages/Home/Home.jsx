import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

const Home = () => {
  const [step, setStep] = useState(null); // Track current step (start or finish)
  const [startPoint, setStartPoint] = useState(null); // Start point coordinates
  const [finishPoint, setFinishPoint] = useState(null); // Finish point coordinates
  const [selectedLocation, setSelectedLocation] = useState(null); // The location clicked on the map
  const navigate = useNavigate(); // Navigate for routing

  // Function to handle setting the start or finish location
  const handleSetLocation = (type) => {
    setStep(type);
    setSelectedLocation(null); // Reset selected location when selecting a new point
  };

  // Function to go to the setdetail page
  const handleFindDriver = () => {
    navigate('/setdetail'); // Navigate to the "setdetail" page
  };

  // Function to handle map click event
  function MapClickHandler() {
    useMapEvents({
      click(event) {
        setSelectedLocation(event.latlng); // Set the clicked location
      },
    });
    return null; // No need to render anything specific for this component
  }

  // Save the selected location
  const handleSaveLocation = () => {
    if (step === 'start') {
      setStartPoint(selectedLocation); // Save the start point
    } else {
      setFinishPoint(selectedLocation); // Save the finish point
    }
    setStep(null); // Close the map after saving the location
    setSelectedLocation(null); // Reset selected location
  };

  // Function to format the location coordinates for display
  const formatLocation = (location) => {
    return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <h1>Welcome to Slide Me!</h1>
        <p>Set your pickup and destination locations by clicking on the map below!</p>

        {/* Show Start and Finish buttons if no step is active */}
        {!step && (
          <div className="location-buttons">
            <div className="location-label-btn">
              <span>Start :</span>
              <Button
                variant="success"
                onClick={() => handleSetLocation('start')}
                className="location-btn"
              >
                {startPoint ? formatLocation(startPoint) : 'Set Start Point'}
              </Button>
            </div>
            <div className="location-label-btn">
              <span>Finish :</span>
              <Button
                variant="success"
                onClick={() => handleSetLocation('finish')}
                className="location-btn"
              >
                {finishPoint ? formatLocation(finishPoint) : 'Set Finish Point'}
              </Button>
            </div>
          </div>
        )}

        {/* Show Map and Save Button based on the selected step */}
        {step && (
          <div>
            <MapContainer
              center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [51.505, -0.09]} // Dynamically set center
              zoom={13}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler />
              {selectedLocation && (
                <Marker position={selectedLocation}>
                  <Popup>{step === 'start' ? 'Start Point' : 'Finish Point'}</Popup>
                </Marker>
              )}
            </MapContainer>
            <Button
              variant="primary"
              onClick={handleSaveLocation}
              disabled={!selectedLocation}
              className="save-btn"
            >
              Save {step === 'start' ? 'Start' : 'Finish'} Point
            </Button>
          </div>
        )}

        {/* Find the Driver Button */}
        {!step && (
          <Button
            variant="info"
            onClick={handleFindDriver}
            className="find-driver-btn"
          >
            Find the Driver
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
