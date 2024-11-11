import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import User from "./pages/User";
import List from "./pages/List"; // Ensure this import exists

const intTab = "home";

function App( ) {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tab, setTab] = useState(intTab); // Initialize with intTab

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div>
        <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab} />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/list" element={<List />} /> {/* Add List route */}
              <Route path="/user" element={<User />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}


export default App;
