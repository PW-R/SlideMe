import React, { useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FaUser, FaCreditCard, FaMapPin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./User.css";

const User = ({ setToken, setRole, handleLogout }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch user info from localStorage
  const phoneNumber = localStorage.getItem("phoneNumber") || "123-456-7890"; // Default phone number if not set
  const username = localStorage.getItem("username") || phoneNumber; // Default username to phone number
  const email = localStorage.getItem("email") || "johndoe@example.com"; // Default email if not set

  // State to manage the profile picture
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "https://via.placeholder.com/150");

  // Handle the logout and navigate to the "Choose User or Driver" page
  const handleLogoutAndNavigate = () => {
    handleLogout(); // Call the logout function
    navigate("/choose"); // Navigate to the "UserOrDriver" page
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result); // Save the selected image to localStorage
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
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
                  src={profilePic} // Display the selected profile picture
                  alt="User Profile"
                  className="profile-pic mb-3"
                  style={{ width: "150px", height: "150px", borderRadius: "50%", cursor: "pointer" }}
                  onClick={() => document.getElementById("fileInput").click()} // Trigger file input when the image is clicked
                />
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }} // Hide the file input
                  onChange={handleImageChange} // Handle image change
                />
                <h4>{username}</h4> {/* Display the username */}
                <p>{email}</p>
                <p>{phoneNumber}</p>
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
