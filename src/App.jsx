import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import SetDetail from "./pages/Home/Setdetail/Setdetail";
import Callstatus from "./pages/Home/Callstatus/Callstatus";
import Payment from "./pages/Home/Payment/Payment";
import List from "./pages/List/List.jsx";
import Notification from "./pages/Notification/Notification.jsx";
import User from "./pages/User/User.jsx";
import Setuserinfo from "./pages/User/Setuserinfo/Setuserinfo";
import Login from "./pages/Login/Login";
import UserOrDriver from "./pages/Login/UserOrDriver";
import Register from "./pages/User/Register"; // Import the Register page
import Search from './pages/Home/Search/Search';  // Make sure the path is correct
import Call from './pages/Home/Call/Call';  // Ensure this path is correct
import MapPage from './pages/Home/Search/MapPage/MapPage'; // Ensure the path is correct
import { PositionProvider } from "./data/PositionContext";

const initialTab = "home";  // Define your initial tab

function App() {
  const [token, setToken] = useState(null);  // Start with null for token
  const [role, setRole] = useState(null);  // Start with null for role
  const [tab, setTab] = useState(initialTab);

  // Get token and role from localStorage on initial load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  // Function to handle login, setting token and role, and storing them in localStorage
  const handleLogin = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
  };

  // Function to handle logout, clearing token and role from state and localStorage
  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <PositionProvider>  {/* Wrap everything with PositionProvider to access context */}
      <HashRouter>
        <Routes>
          {/* Public Routes (Login, Register, UserOrDriver) */}
          {!token ? (
            <>
              <Route path="/" element={<UserOrDriver />} />
              <Route
                path="/login/:role"
                element={<Login setToken={handleLogin} setRole={setRole} />}
              />
              <Route path="/register" element={<Register />} />{" "}
              {/* Register Page */}
            </>
          ) : (
            /* Authenticated Routes (Inside Layout) */
            <Route path="/" element={<Layout tab={tab} setTab={setTab} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/setdetail" element={<SetDetail />} />
              <Route path="/callstatus" element={<Callstatus />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/list" element={<List />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/search" element={<Search />} />
              <Route path="/call" element={<Call />} />
              <Route path="/map" element={<MapPage />} />
              <Route
                path="/user"
                element={<User handleLogout={handleLogout} />} // Pass logout function
              />
              <Route path="/setuserinfo" element={<Setuserinfo />} />
              {/* Redirect to Home if logged in */}
              <Route path="/" element={<Navigate to="/home" />} />
            </Route>
          )}

          {/* Fallback Redirect if no matching route is found */}
          <Route path="*" element={<Navigate to={token ? "/home" : "/"} />} />
        </Routes>
      </HashRouter>
    </PositionProvider>
  );
}

export default App;
