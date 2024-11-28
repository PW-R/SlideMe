import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import slidemelogo from "../../assets/png/slidemelogo.png"; // Adjust the path if needed
import "./Login.css";

function Login({ setToken, setRole }) {
  const { role } = useParams(); // Get the role (user or driver) from the URL
  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // To manage error message

  const [errorMessage, setErrorMessage] = useState(""); // Manage error messages
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP

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
  // Define mock user data for demonstration purposes
  const users = [
    { phoneNumber: "0808107819", password: "32", token: "userToken", role: "user" },
    { phoneNumber: "9876543210", password: "driver123", token: "driverToken", role: "driver" },
  ];

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setGeneratedOtp(otp);
    setIsOtpSent(true);
    alert(`Your OTP is: ${otp}`); // Simulate OTP sending
  };

  const verifyOtp = (otp) => otp === generatedOtp;

  const handleLogin = (e) => {
    e.preventDefault();
    const phoneNumber = userRef.current.value.trim();
    const password = passRef.current.value.trim();
    userRef.current.value = ""; // Clear input fields
    passRef.current.value = "";

    const userInfo = verifyUser(phoneNumber, password);
    if (userInfo === null) {
    const userInfo = users.find(
      (user) =>
        user.phoneNumber === phoneNumber &&
        user.password === password &&
        user.role === role
    );

    if (!userInfo) {
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
    <Container className="login-container text-center py-5">
      <img src={slidemelogo} alt="Slide Me Logo" className="logo" />
      <h3 className="mt-3">{role === "user" ? "User Login" : "Driver Login"}</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="phoneNumber" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter phone number" ref={userRef} required />
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
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" ref={passRef} required />
        </Form.Group>

        {isOtpSent && (
          <Form.Group controlId="otp" className="mt-3">
            <Form.Label>OTP</Form.Label>
            <Form.Control type="text" placeholder="Enter OTP" ref={otpRef} required />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Login
        </Button>

        {!isOtpSent && (
          <Button
            variant="secondary"
            className="w-100 mt-3"
            onClick={generateOtp}
          >
            Request OTP
          </Button>
        )}
      </Form>
      <div className="text-center mt-3">
        <Link to="/register" className="link">Register</Link> | <Link to="/reset-password" className="link">Forgot Password?</Link>
      </div>
    </Container>
  );
}

export default Login;
