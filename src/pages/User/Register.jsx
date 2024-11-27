import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(randomOtp);
    setIsOtpSent(true);
    alert(`Your OTP is: ${randomOtp}`); // Simulating SMS via alert
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      setError("Please request OTP first.");
      return;
    }
    if (otp !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    // Simulating successful registration
    alert("Registration successful!");
    navigate("/login"); // Redirect to login
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>Register</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {!isOtpSent && (
              <Button
                variant="secondary"
                className="w-100 mt-3"
                onClick={generateOtp}
              >
                Send OTP
              </Button>
            )}

            {isOtpSent && (
              <Form.Group controlId="otp" className="mt-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
