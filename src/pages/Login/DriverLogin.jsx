import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DriverLogin = ({ setToken, setRole }) => {
  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  // Sample driver data (you can modify this for real authentication)
  const verifyDriver = (username, password) => {
    const drivers = [
      { username: "driver1", password: "driver123", token: "driverToken", role: "driver" },
      { username: "driver2", password: "driver456", token: "driverToken2", role: "driver" },
    ];

    return drivers.find((driver) => driver.username === username && driver.password === password) || null;
  };

  const handleLogin = (e) => {
    e.preventDefault();  // Prevent form default submission behavior
    
    const username = userRef.current.value.trim();
    const password = passRef.current.value.trim();

    // Check if both fields are filled
    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    const driverInfo = verifyDriver(username, password);
    if (driverInfo) {
      setToken(driverInfo.token);  // Store token
      setRole(driverInfo.role);    // Set role
      navigate("/home");           // Redirect to home page
    } else {
      alert("Incorrect username or password.");
      userRef.current.focus();  // Focus back on username input if login fails
    }

    // Clear inputs after the attempt
    userRef.current.value = "";
    passRef.current.value = "";
  };

  return (
    <div className="login-container">
      <h2>Driver Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            ref={userRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            ref={passRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4 w-100">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default DriverLogin;
