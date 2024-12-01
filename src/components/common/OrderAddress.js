import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/OrderAddress.scss"; // Import the SCSS file
import { IoLocationSharp } from "react-icons/io5";
import { Row, Col, Container } from "react-bootstrap"; // Import React-Bootstrap components

const OrderAddress = ({ orderGroupId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order details from the PHP endpoint
    axios
      .get(
        `http://localhost/minnano/backend/getOrderDetails.php?orderGroupId=${orderGroupId}`,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      )
      .then((response) => {
        if (response.data.success) {
          setOrderDetails(response.data.data);
        } else {
          setError(response.data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to fetch order details");
        setLoading(false);
      });
  }, [orderGroupId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      {orderDetails ? (
        <div className="order-address">
          <div className="address-card">
            <Row className="mb-3">
              <Col>
                <IoLocationSharp className="location-icon" />
                <strong>Delivery Address</strong>
              </Col>
            </Row>

            <Row className="m-0 d-flex align-items-center">
              <Col xs={12}>
                <p>
                  <strong>{orderDetails.fullName}</strong>
                </p>
                <p>{orderDetails.shippingContact} </p>
                <p>{orderDetails.shippingAddress}</p>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </Container>
  );
};

export default OrderAddress;
