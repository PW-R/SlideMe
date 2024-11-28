import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserOrDriver() {
  const navigate = useNavigate();

  // Handle navigation based on the role
  const handleLoginTypeSelection = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <h3>Select Login Type</h3>
            <Button
              variant="outline-primary"
              onClick={() => handleLoginTypeSelection('user')}
              className="w-100 mb-3"
            >
              User Login
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => handleLoginTypeSelection('driver')}
              className="w-100"
            >
              Driver Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserOrDriver;
