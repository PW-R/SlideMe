import React, { useState } from "react";
import { Card, Button, ListGroup, Row, Col, Container, Badge, Tab, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./List.css"; // Optional styling file

const List = () => {
  const navigate = useNavigate();

  // Example orders with different statuses
  const orders = [
    { id: 1, driverName: "John Doe", price: 100, transportType: "Tow Truck", status: "Ongoing", shopName: "Shop A" },
    { id: 2, driverName: "Jane Smith", price: 80, transportType: "Flatbed", status: "Payment Required", shopName: "Shop B" },
    { id: 3, driverName: "Chris Johnson", price: 120, transportType: "Tow Truck", status: "Finished", shopName: "Shop C" },
  ];

  // State to store bookmarks and selected tab
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("ongoing");

  // Function to handle bookmark addition
  const handleBookmark = (order) => {
    if (!bookmarks.some((bookmark) => bookmark.id === order.id)) {
      setBookmarks([...bookmarks, order]);
    }
  };

  // Handle order selection
  const handleSelectOrder = (orderId) => {
    navigate("/callstatus", { state: { orderId } });
  };

  // Function to display badge color based on order status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return <Badge bg="info">{status}</Badge>;
      case "Payment Required":
        return <Badge bg="warning">{status}</Badge>;
      case "Finished":
        return <Badge bg="success">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Separate orders into ongoing, bookmarked, and finished
  const ongoingOrders = orders.filter((order) => order.status === "Ongoing");
  const finishedOrders = orders.filter((order) => order.status === "Finished");

  return (
    <Container className="list-page">
      <Card className="p-4 shadow-sm rounded">
        <h3 className="text-center mb-4">Orders Status</h3>

        {/* Tabs */}
        <Tab.Container activeKey={selectedTab} onSelect={(key) => setSelectedTab(key)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="ongoing">Ongoing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookmarked">Bookmarked</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">History</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Ongoing Orders */}
            <Tab.Pane eventKey="ongoing">
              <ListGroup variant="flush">
                {ongoingOrders.map((order) => (
                  <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
                    <Row className="w-100">
                      <Col md={8}>
                        <h5>{order.driverName}</h5>
                        <p>{order.transportType}</p>
                      </Col>
                      <Col md={4} className="text-end">
                        <h6>${order.price}</h6>
                        <div className="mb-2">{getStatusBadge(order.status)}</div>
                        <Button
                          variant="primary"
                          onClick={() => handleSelectOrder(order.id)}
                          className="mt-2"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleBookmark(order)}
                          className="mt-2 ms-2"
                        >
                          Bookmark
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab.Pane>

            {/* Bookmarked Orders */}
            <Tab.Pane eventKey="bookmarked">
              <ListGroup variant="flush">
                {bookmarks.length === 0 ? (
                  <p>No bookmarked orders</p>
                ) : (
                  bookmarks.map((order) => (
                    <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
                      <Row className="w-100">
                        <Col md={8}>
                          <h5>{order.driverName}</h5>
                          <p>{order.transportType}</p>
                        </Col>
                        <Col md={4} className="text-end">
                          <h6>${order.price}</h6>
                          <div className="mb-2">{getStatusBadge(order.status)}</div>
                          <Button
                            variant="primary"
                            onClick={() => handleSelectOrder(order.id)}
                            className="mt-2"
                          >
                            View Details
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Tab.Pane>

            {/* History Orders */}
            <Tab.Pane eventKey="history">
              <ListGroup variant="flush">
                {finishedOrders.length === 0 ? (
                  <p>No finished orders</p>
                ) : (
                  finishedOrders.map((order) => (
                    <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
                      <Row className="w-100">
                        <Col md={8}>
                          <h5>{order.driverName}</h5>
                          <p>{order.transportType}</p>
                        </Col>
                        <Col md={4} className="text-end">
                          <h6>${order.price}</h6>
                          <div className="mb-2">{getStatusBadge(order.status)}</div>
                          <Button
                            variant="primary"
                            onClick={() => handleSelectOrder(order.id)}
                            className="mt-2"
                          >
                            View Details
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </Container>
  );
};

export default List;
