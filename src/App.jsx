import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import User from "./pages/User/User.jsx";
import List from "./pages/List/List.jsx"; 
import Login from "./pages/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';


const intTab = "home";

function App( ) {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tab, setTab] = useState(intTab); 

  useEffect(() => {
    setTab(intTab);
  }, []);

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
              <Route path="/list" element={<List />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}


export default App;
