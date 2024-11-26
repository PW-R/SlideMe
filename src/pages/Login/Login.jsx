import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Login.css";

function Login({ setToken, setRole }) {
  const { role } = useParams(); // Get the role from the URL (user or driver)
  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // To manage error message

  // Define the verifyUser function
  const verifyUser = (phoneNumber, password) => {
    const users = [
      { phoneNumber: "0808107819", password: "32", token: "userToken", role: "user" },
      { phoneNumber: "9876543210", password: "driver123", token: "driverToken", role: "driver" }
    ];

    const user = users.find(
      (user) => user.phoneNumber === phoneNumber && user.password === password && user.role === role
    );

    return user ? user : null;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const phoneNumber = userRef.current.value.trim();
    const password = passRef.current.value.trim();
    userRef.current.value = ""; // Clear input fields
    passRef.current.value = "";

    const userInfo = verifyUser(phoneNumber, password);
    if (userInfo === null) {
      setErrorMessage("Wrong phone number or password");
      userRef.current.focus();
    } else {
      setErrorMessage(""); // Clear error message
      setToken(userInfo.token);
      setRole(userInfo.role);
      // Save token and role in localStorage for persistence
      localStorage.setItem("token", userInfo.token);
      localStorage.setItem("role", userInfo.role);
      navigate(userInfo.role === "user" ? "/home" : "/driver-dashboard");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>{role === "user" ? "User Login" : "Driver Login"}</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Error Message Display */}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                ref={userRef}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={passRef}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link to="/register">Register</Link> | <Link to="/reset-password">Forgot Password?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
