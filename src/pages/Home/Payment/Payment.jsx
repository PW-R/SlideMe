import React, { useState } from "react";
import { Card, Button, ListGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Payment.css";  // Optional styling file

const Payment = () => {
  const navigate = useNavigate();

  // Example data (replace with dynamic data as needed)
  const selectedOffer = {
    driverName: "John Doe",
    price: 100,
    discount: 10,
    appFee: 5,
    driverFee: 15,
  };

  const totalPrice = selectedOffer.price - selectedOffer.discount + selectedOffer.appFee + selectedOffer.driverFee;

  // State for modal and payment selection
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle modal visibility
  const handleSelectPayment = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle payment method selection
  const handlePaymentOption = (method) => {
    setPaymentMethod(method);
    setShowModal(false); // Close the modal after selecting a payment method
  };

  // Cancel button - Navigate back to the Callstatus page
  const handleCancel = () => {
    navigate("/callstatus");  // Redirect back to the Callstatus page
  };

  return (
    <div className="payment-page">
      <Card className="p-4 shadow-sm rounded">
        <h3 className="text-center mb-4">Payment</h3>

        <Card.Body>
          <h5 className="mb-4">Payment Summary</h5>

          <ListGroup variant="flush">
            {/* Driver Name */}
            <ListGroup.Item>
              <strong>Driver:</strong> {selectedOffer.driverName}
            </ListGroup.Item>

            {/* Original Price */}
            <ListGroup.Item>
              <strong>Original Price:</strong> ${selectedOffer.price}
            </ListGroup.Item>

            {/* Discount */}
            <ListGroup.Item>
              <strong>Discount:</strong> -${selectedOffer.discount}
            </ListGroup.Item>

            {/* App Fee */}
            <ListGroup.Item>
              <strong>App Fee:</strong> +${selectedOffer.appFee}
            </ListGroup.Item>

            {/* Driver Fee */}
            <ListGroup.Item>
              <strong>Driver Fee:</strong> +${selectedOffer.driverFee}
            </ListGroup.Item>

            {/* Total Price */}
            <ListGroup.Item>
              <strong>Total Price:</strong> ${totalPrice}
            </ListGroup.Item>
          </ListGroup>

          {/* Buttons for Select Payment Option and Cancel */}
          <Button variant="primary" className="w-100 mt-4" onClick={handleSelectPayment}>
            Select Payment Option
          </Button>
          <Button variant="secondary" className="w-100 mt-2" onClick={handleCancel}>
            Cancel
          </Button>
        </Card.Body>
      </Card>

      {/* Payment Method Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="success"
            className="w-100 mb-2"
            onClick={() => handlePaymentOption("Credit Card")}
          >
            Credit Card
          </Button>
          <Button
            variant="info"
            className="w-100 mb-2"
            onClick={() => handlePaymentOption("PayPal")}
          >
            PayPal
          </Button>
          <Button
            variant="warning"
            className="w-100 mb-2"
            onClick={() => handlePaymentOption("Bank Transfer")}
          >
            Bank Transfer
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;
