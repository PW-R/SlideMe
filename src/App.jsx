import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import SetDetail from './pages/Home/Setdetail/Setdetail';
import Callstatus from './pages/Home/Callstatus/Callstatus';
import Payment from "./pages/Home/Payment/Payment";
import List from "./pages/List/List.jsx";
import Notification from "./pages/Notification/Notification.jsx";
import User from "./pages/User/User.jsx";
import Setuserinfo from './pages/User/Setuserinfo/Setuserinfo';
import Login from "./pages/Login/Login";
import UserOrDriver from "./pages/Login/UserOrDriver";
import Register from "./pages/User/Register"; // Import the Register page

const intTab = "home";

function App() {
  const [token, setToken] = useState(null); // Start with null for token
  const [role, setRole] = useState(null); // Start with null for role
  const [tab, setTab] = useState(intTab);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

  const handleLogin = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
  };

  const handleLogout = () => {
    setToken(null); // Clear the token
    setRole(null); // Clear the role
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Remove role from localStorage
  };

  return (
    <HashRouter>
      <Routes>
        {/* Routes for Public Access (Login, Register, UserOrDriver) */}
        {!token ? (
          <>
            <Route path="/" element={<UserOrDriver />} />
            <Route path="/login/:role" element={<Login setToken={handleLogin} setRole={setRole} />} />
            <Route path="/register" element={<Register />} /> {/* Register Page */}
          </>
        ) : (
          /* Routes for Authenticated Users (Inside Layout) */
          <Route path="/" element={<Layout tab={tab} setTab={setTab} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/setdetail" element={<SetDetail />} />
            <Route path="/callstatus" element={<Callstatus />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/list" element={<List />} />
            <Route path="/notification" element={<Notification />} />
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
  );
}

export default App;
