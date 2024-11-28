import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import slidemelogo from '../../assets/png/slidemelogo.png'; // Adjust the path if necessary
import './UserOrDriver.css'; // Create this CSS file for styling

function UserOrDriver() {
  const navigate = useNavigate();

  // Handle navigation based on the role
  const handleLoginTypeSelection = (role) => {
    if (role === 'driver') {
      // For driver, navigate to the external URL
      window.location.href = "https://pw-r.github.io/Slideme-Fang-Bua/";
    } else {
      // For user, navigate to the login page for users
      navigate(`/login/${role}`);
    }
  };

  return (
    <Container className="choose-container text-center py-5">
      <img src={slidemelogo} alt="Slide Me Logo" className="logo" />
      <h3 className="mt-3">Are You User or Driver?</h3>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Button
            variant="outline-success"
            className="w-100 mb-3"
            onClick={() => handleLoginTypeSelection('user')}
          >
            User
          </Button>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => handleLoginTypeSelection('driver')}
          >
            Driver
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default UserOrDriver;
