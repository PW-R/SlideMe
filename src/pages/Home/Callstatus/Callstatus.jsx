import React, { useState } from "react";
import { Tab, Tabs, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Callstatus.css";  // You can create this file to style the page if needed

const Callstatus = () => {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState(null);  // Manage selected offer
  const [activeTab, setActiveTab] = useState("offer");  // Switch between "offer" and "detail"

  // Sample offers (replace with dynamic data as needed)
  const offers = [
    { id: 1, driverName: "John Doe", price: 100, description: "Offer for a normal car" },
    { id: 2, driverName: "Jane Smith", price: 120, description: "Offer for a broken car" },
    { id: 3, driverName: "Tom Brown", price: 90, description: "Offer for a flatbed" },
  ];

  // Handle offer selection
  const handleOfferSelect = (offer) => {
    setSelectedOffer(offer);  // Set the selected offer
    setActiveTab("detail");  // Switch to the "detail" tab
  };

  // Handle "Call Service" button click (navigate to payment page)
  const handleCallService = () => {
    navigate("/payment");  // Navigate to the payment page
  };

  return (
    <div className="callstatus-page">
      <Card className="p-4 shadow-sm rounded">
        <h3 className="text-center mb-4">Call Status</h3>

        <Tabs
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          id="callstatus-tabs"
          className="mb-3"
        >
          {/* Offer Tab */}
          <Tab eventKey="offer" title="Offer">
            <div className="offer-list">
              {offers.map((offer) => (
                <Card key={offer.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{offer.driverName}</Card.Title>
                    <Card.Text>{offer.description}</Card.Text>
                    <Button variant="primary" onClick={() => handleOfferSelect(offer)}>
                      Select Offer
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Tab>

          {/* Detail Tab */}
          <Tab eventKey="detail" title="Detail" disabled={!selectedOffer}>
            {selectedOffer ? (
              <div className="offer-detail">
                <h4>Offer Details</h4>
                <p><strong>Driver:</strong> {selectedOffer.driverName}</p>
                <p><strong>Description:</strong> {selectedOffer.description}</p>
                <p><strong>Price:</strong> ${selectedOffer.price}</p>
                <Button variant="success" onClick={handleCallService}>
                  Call Service
                </Button>
              </div>
            ) : (
              <p>Please select an offer to view the details.</p>
            )}
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default Callstatus;
