import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { setUserInfo } from "../../../data/userinfo";  // Updated import path
import "./Setdetail.css";

const Setdetail = () => {
  const [carType, setCarType] = useState('');
  const [carCondition, setCarCondition] = useState('');
  const [carAge, setCarAge] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [transportType, setTransportType] = useState('');
  const [callMethod, setCallMethod] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Validate form data
    if (false) { // Disable validation for testing
      setErrorMessage("All fields must be filled out.");
      return;
    }

    // Collect data and store in userinfo.js
    setUserInfo({
      carType,
      carCondition,
      carAge,
      registrationNumber,
      moreInfo,
      transportType,
      callMethod,
      dateTime
    });

    // Optionally, navigate to Callstatus page after submission
    navigate("/callstatus"); // This navigates to the Callstatus page
  };

  return (
    <div className="setdetail-page">
      <Card className="p-4 shadow-sm rounded">
        <h3 className="text-center mb-4">Set Car Details</h3>
        
        {/* Error Message Display */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Car Type */}
            <Col md={6}>
              <Form.Group controlId="carType">
                <Form.Label>Car Type</Form.Label>
                <Form.Control
                  type="text"
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  placeholder="Enter car type"
                />
              </Form.Group>
            </Col>

            {/* Car Condition */}
            <Col md={6}>
              <Form.Group controlId="carCondition">
                <Form.Label>Car Condition</Form.Label>
                <Form.Control
                  as="select"
                  value={carCondition}
                  onChange={(e) => setCarCondition(e.target.value)}
                >
                  <option value="">Select Condition</option>
                  <option value="normal">Normal</option>
                  <option value="broken">Broken</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Car Age */}
            <Col md={6}>
              <Form.Group controlId="carAge">
                <Form.Label>Car Age</Form.Label>
                <Form.Control
                  type="number"
                  value={carAge}
                  onChange={(e) => setCarAge(e.target.value)}
                  min="1"
                  placeholder="Enter car age"
                />
              </Form.Group>
            </Col>

            {/* Registration Number */}
            <Col md={6}>
              <Form.Group controlId="registrationNumber">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="Enter registration number"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* More Info */}
          <Form.Group controlId="moreInfo" className="mb-3">
            <Form.Label>More Info</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={moreInfo}
              onChange={(e) => setMoreInfo(e.target.value)}
              placeholder="Additional details (optional)"
            />
          </Form.Group>

          <Row className="mb-3">
            {/* Transport Type */}
            <Col md={6}>
              <Form.Group controlId="transportType">
                <Form.Label>Transport Type</Form.Label>
                <Form.Control
                  as="select"
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                >
                  <option value="">Select Transport Type</option>
                  <option value="towTruck">Tow Truck</option>
                  <option value="flatbed">Flatbed</option>
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Call Method (Immediate or Scheduled) */}
            <Col md={6}>
              <Form.Group controlId="callMethod">
                <Form.Label>Call Method</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Immediate"
                    name="callMethod"
                    value="immediate"
                    checked={callMethod === 'immediate'}
                    onChange={(e) => setCallMethod(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Schedule"
                    name="callMethod"
                    value="schedule"
                    checked={callMethod === 'schedule'}
                    onChange={(e) => setCallMethod(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Date and Time (for scheduled calls) */}
          {callMethod === 'schedule' && (
            <Form.Group controlId="dateTime" className="mb-3">
              <Form.Label>Pick Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </Form.Group>
          )}

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Submit Details
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Setdetail;
