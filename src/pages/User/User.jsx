import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FaUser, FaCreditCard, FaMapPin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./User.css";

const User = ({ setToken, setRole, handleLogout }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogoutAndNavigate = () => {
    handleLogout(); // Call the logout function
    navigate("/login/user"); // Navigate to the login page for users, change this to your login path
  };

  return (
    <div className="user-page">
      <Container className="py-4">
        <Row>
          <Col md={4}>
            <Card className="shadow-sm rounded">
              <Card.Body className="text-center">
                {/* Profile Picture Section */}
                <img
                  src="https://via.placeholder.com/150" // Placeholder profile picture
                  alt="User Profile"
                  className="profile-pic mb-3"
                  style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                />
                <h4>John Doe</h4>
                <p>johndoe@example.com</p>
                <p>123-456-7890</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="shadow-sm rounded">
              <Card.Body>
                {/* Three buttons for different sections */}
                <h5>Manage Account</h5>
                <Row className="g-3">
                  <Col md={12}>
                    <Link to="/setuserinfo">
                      <Button variant="outline-primary" className="w-100">
                        <FaUser /> User Info Settings
                      </Button>
                    </Link>
                  </Col>
                  <Col md={12}>
                    <Button variant="outline-success" className="w-100">
                      <FaCreditCard /> Payment Method
                    </Button>
                  </Col>
                  <Col md={12}>
                    <Button variant="outline-warning" className="w-100">
                      <FaMapPin /> Preset Location
                    </Button>
                  </Col>
                  {/* Logout Button */}
                  <Col md={12} className="mt-3">
                    <Button variant="outline-danger" className="w-100" onClick={handleLogoutAndNavigate}>
                      Log Out
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default User;
