import React, { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import slidemelogo from "../../assets/png/slidemelogo.png"; // Adjust the path if needed
import "./Login.css";

function DriverLogin() {
  const { role } = useParams(); // Get the role from the URL (either 'user' or 'driver')
  const userRef = useRef();
  const passRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP

  // Mock user data (replace with actual authentication mechanism)
  const users = [
    { phoneNumber: "0808107819", password: "32", token: "userToken", role: "user" },
    { phoneNumber: "9876543210", password: "driver123", token: "driverToken", role: "driver" },
  ];

  // Function to generate and send OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setGeneratedOtp(otp); // Save generated OTP
    setIsOtpSent(true); // Mark OTP as sent
    alert(`Your OTP is: ${otp}`); // Simulate sending OTP (replace with actual API call)
  };

  // Function to verify OTP
  const verifyOtp = (enteredOtp) => enteredOtp === generatedOtp;

  // Handle form submission (login)
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from submitting

    const phoneNumber = userRef.current.value.trim();
    const password = passRef.current.value.trim();

    // Find user data by phone number, password, and role
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

    // Check if OTP is valid
    if (!verifyOtp(otpRef.current.value.trim())) {
      setErrorMessage("Invalid OTP. Please try again.");
      return;
    }

    // Clear error messages and proceed to login
    setErrorMessage("");
    localStorage.setItem("token", userInfo.token); // Store token in local storage
    localStorage.setItem("role", userInfo.role); // Store role in local storage

    // Redirect based on user role
    navigate(userInfo.role === "user" ? "/home" : "/driver-dashboard");
  };

  return (
    <Container className="login-container text-center py-5">
      <img src={slidemelogo} alt="Slide Me Logo" className="logo" />
      <h3 className="mt-3">{role === "user" ? "User Login" : "Driver Login"}</h3>

      {/* Display error message if login fails */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Form onSubmit={handleLogin}>
        <Form.Group controlId="phoneNumber" className="mt-3">
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

        {/* OTP input field is only shown after OTP is requested */}
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

        {/* Login button */}
        <Button variant="primary" type="submit" className="w-100 mt-4">
          Login
        </Button>

        {/* Request OTP button */}
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

export default DriverLogin;
