import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Outlet } from 'react-router';
import Map from "./Map/Map";
import L from 'leaflet';
import { usePosition } from "../../../data/PositionContext";
import './Call.css';

function Call() {
  const { origin, destination, driver } = usePosition();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRouteReady, setIsRouteReady] = useState(false); // Declare the state
  const mapContainerRef = useRef(null);

  // Derive tab directly from pathname
  const tab = location.pathname.includes("/call/details") ? "details" : "offer";

  useEffect(() => {
    if (location.pathname === "/call") {
      navigate("/call/offer");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (origin && destination && mapContainerRef.current) {
      const map = L.map(mapContainerRef.current).setView(origin, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(origin[0], origin[1]),
          L.latLng(destination[0], destination[1]),
        ],
        routeWhileDragging: true,
        lineOptions: { styles: [{ color: 'blue', weight: 6 }] },
      });

      routingControl.on('routesfound', () => {
        setIsRouteReady(true);
      });

      routingControl.addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [origin, destination]);

  const handleTabChange = (newTab) => {
    if (newTab === "offer") {
      navigate("/call/offer");
    } else if (newTab === "details") {
      navigate("/call/details");
    }
  };

  return (
    <div className="app-container">
      <div className="call-container">
        <div className="title-map">
          <Link to='/search'>
            <i className="bi bi-chevron-left"></i>
          </Link>
          <h1>เรียกรถสไลด์</h1>
        </div>

        {/* Map */}
        <div className="call-map">
          {origin && destination ? (
            <Map />
          ) : (
            <p className="alert">กรุณาเลือกตำแหน่งต้นทางและปลายทางก่อน</p>
          )}
        </div>

        <div className="call-tab">
          <div className="two-button">
            <button
              className={`nav-link ${tab === 'offer' ? 'active' : ''}`}
              onClick={() => handleTabChange('offer')}>
              Offer
            </button>
            <button
              className={`nav-link ${tab === 'details' ? 'active' : ''}`}
              onClick={() => handleTabChange('details')}>
              รายละเอียด
            </button>
          </div>
          <div className="call-outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Call;
