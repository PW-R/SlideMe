import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import SetDetail from './pages/Home/Setdetail/Setdetail'; // Updated import path
import Callstatus from './pages/Home/Callstatus/Callstatus';
import Payment from "./pages/Home/Payment/Payment"; // Import Payment page
import List from "./pages/List/List.jsx";
import Notification from "./pages/Notification/Notification.jsx";
import User from "./pages/User/User.jsx";
import Setuserinfo from './pages/User/Setuserinfo/Setuserinfo'; // Corrected import path
import Login from "./pages/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

const intTab = "home";

function App() {
  const [token, setToken] = useState("1");
  const [role, setRole] = useState("");
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

  if (!token) {
    return <Login setToken={handleLogin} setRole={setRole} />;
  } else {
    return (
      <div>
        <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab} />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/setdetail" element={<SetDetail />} />
              <Route path="/callstatus" element={<Callstatus />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/list" element={<List />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/user" element={<User />} />
              <Route path="/setuserinfo" element={<Setuserinfo />} /> {/* Corrected route */}
              <Route path="/login" element={<Navigate to="/home" />} /> {/* Redirect if logged in */}
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
