import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Login.css";

function Login({ setToken, setRole }) {
  const { role } = useParams(); // Get the role from the URL (user or driver)
  const userRef = useRef();
  const passRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // To manage error message
  const [isOtpSent, setIsOtpSent] = useState(false); // To manage OTP state
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification

  // Define mock user data
  const users = [
    { phoneNumber: "0808107819", password: "32", token: "userToken", role: "user" },
    { phoneNumber: "9876543210", password: "driver123", token: "driverToken", role: "driver" },
  ];

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(otp);
    setIsOtpSent(true);
    alert(`Your OTP is: ${otp}`); // Simulate sending OTP
  };

  const verifyOtp = (otp) => otp === generatedOtp;

  const handleLogin = (e) => {
    e.preventDefault();
    const phoneNumber = userRef.current.value.trim();
    const password = passRef.current.value.trim();

    const userInfo = users.find(
      (user) => user.phoneNumber === phoneNumber && user.password === password && user.role === role
    );

    if (!userInfo) {
      setErrorMessage("Wrong phone number or password");
      return;
    }

    if (!isOtpSent) {
      setErrorMessage("Please request OTP first.");
      return;
    }

    if (!verifyOtp(otpRef.current.value.trim())) {
      setErrorMessage("Invalid OTP. Please try again.");
      return;
    }

    setErrorMessage(""); // Clear errors on successful login
    setToken(userInfo.token);
    setRole(userInfo.role);
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("role", userInfo.role);
    navigate(userInfo.role === "user" ? "/home" : "/driver-dashboard");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>{role === "user" ? "User Login" : "Driver Login"}</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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

            {!isOtpSent && (
              <Button
                variant="secondary"
                className="w-100 mt-3"
                onClick={() => {
                  generateOtp();
                  setErrorMessage(""); // Clear previous errors
                }}
              >
                Request OTP
              </Button>
            )}

            {isOtpSent && (
              <Form.Group controlId="otp" className="mt-3">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  ref={otpRef}
                  required
                />
              </Form.Group>
            )}

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
