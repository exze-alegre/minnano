import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ShippingAddress.scss"; // Import the SCSS file
import { IoLocationSharp } from "react-icons/io5";
import { Row, Col, Button, Container, Modal, Form } from "react-bootstrap"; // Import React-Bootstrap components

const ShippingAddress = () => {
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(1); // Default address is with id 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    console.log("Component mounted");

    // Fetch the shipping addresses from the PHP endpoint
    axios
      .get("http://localhost/minnano/backend/getShippingAddress.php?user_id=1")
      .then((response) => {
        setShippingAddresses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to fetch data");
        setLoading(false);
      });
  }, []);

  const handleChangeAddress = () => {
    setShowModal(true); // Open modal when the "Change" button is clicked
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id); // Update the selected address
    setShowModal(false); // Close the modal after selecting an address
  };

  const handleCloseModal = () => setShowModal(false); // Close modal without making changes

  const handleAddAddress = () => {
    // Add your logic for adding a new address here
    console.log("Add new address clicked");
  };

  return (
    <Container>
      {Array.isArray(shippingAddresses) && shippingAddresses.length > 0 ? (
        shippingAddresses
          .filter((address) => address.id === selectedAddressId) // Only show the selected address
          .map((address, index) => (
            <div key={index} className="shipping-address">
              <div className="address-card">
                <Row className="mb-3">
                  <Col>
                    <IoLocationSharp className="location-icon" />
                    <strong>Delivery Address</strong>
                  </Col>
                </Row>

                <Row className="m-0 d-flex align-items-center">
                  <Col xs={11}>
                    {/* Full Name, Number, Address all on the same line and take up full width */}
                    <p>
                      <strong>{address.full_name}</strong> |
                      <span> {address.contact_number}</span> |
                      <span> {address.address}</span>
                    </p>
                  </Col>

                  <Col
                    xs={1}
                    className="d-flex justify-content-end align-items-center"
                  >
                    {/* Change Button aligned to the right and vertically centered */}
                    <Button
                      variant="danger"
                      className="change-button"
                      onClick={handleChangeAddress}
                    >
                      Change
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          ))
      ) : (
        <p>No shipping addresses found</p>
      )}

      {/* Modal for selecting a new address */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {shippingAddresses.map((address) => (
              <div key={address.id} className="address-option">
                <Row className="mb-3 position-relative">
                  <Col>
                    <Form.Check
                      type="radio"
                      id={`address-${address.id}`}
                      label={
                        <>
                          <strong>{address.full_name}</strong> |
                          <span> {address.contact_number}</span> |
                          <span> {address.address}</span>
                        </>
                      }
                      name="shippingAddress"
                      checked={address.id === selectedAddressId}
                      onChange={() => handleSelectAddress(address.id)}
                    />
                  </Col>
                  <Col xs={1} className="d-flex justify-content-end">
                    {/* Edit link */}
                    <a href="#" className="edit-link">
                      Edit
                    </a>
                  </Col>
                </Row>
              </div>
            ))}
          </Form>
          {/* Add Address Button */}
          <Button variant="light" className="w-100" onClick={handleAddAddress}>
            Add Address
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ShippingAddress;
