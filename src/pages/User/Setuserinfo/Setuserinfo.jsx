import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Setuserinfo.css';

const Setuserinfo = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();

    if (!username || !phoneNumber || !email || !password) {
      setErrorMessage('All fields must be filled out.');
      return;
    }

    setErrorMessage('');
    console.log('User Info Saved:', { username, phoneNumber, email, password });

    // Navigate back to the User page after saving
    navigate('/');  // Navigate to the root or User page
  };

  return (
    <div className="setuserinfo-page">
      <Card className="p-4 shadow-sm rounded">
        <h3 className="text-center mb-4">Set User Info</h3>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSave}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-4">
            Save
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Setuserinfo;
