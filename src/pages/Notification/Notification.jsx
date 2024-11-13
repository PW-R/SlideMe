import React, { useState } from "react";
import { Card, Button, ListGroup, Row, Col, Container, Badge } from "react-bootstrap";
import { FaRegBell, FaTrashAlt } from "react-icons/fa"; // Icons for notification and trash
import "./Notification.css"; // Optional CSS styling for the page

const Notification = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Order 1", message: "Your order is now in progress.", timestamp: "2024-11-12 10:00 AM", read: false },
    { id: 2, title: "Payment Due", message: "Your payment is due in 24 hours.", timestamp: "2024-11-12 09:30 AM", read: false },
    { id: 3, title: "Order 2 Completed", message: "Your order has been completed and is ready for pickup.", timestamp: "2024-11-11 05:00 PM", read: true },
    { id: 4, title: "Offer Received", message: "You have received a new offer for your ride request.", timestamp: "2024-11-11 03:30 PM", read: false },
  ]);

  // Function to mark a notification as read
  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Function to delete a notification
  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <Container className="notification-page">
      <Card className="p-4 shadow-sm rounded">
        <h3 className="text-center mb-4">Notifications</h3>

        {/* Notification List */}
        <ListGroup variant="flush">
          {notifications.length === 0 ? (
            <p>No notifications yet.</p>
          ) : (
            notifications.map((notification) => (
              <ListGroup.Item
                key={notification.id}
                className={`d-flex justify-content-between align-items-center ${notification.read ? "read" : "unread"}`}
              >
                <Row className="w-100">
                  <Col md={8}>
                    <h5>{notification.title}</h5>
                    <p>{notification.message}</p>
                    <small>{notification.timestamp}</small>
                  </Col>
                  <Col md={4} className="text-end">
                    {/* Mark as Read Button */}
                    {!notification.read && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="mb-2"
                      >
                        Mark as Read
                      </Button>
                    )}
                    {/* Delete Button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Notification;
