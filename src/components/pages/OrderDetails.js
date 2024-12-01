import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the dynamic parameter from the URL
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../styles/OrderDetails.scss";

const OrderDetails = () => {
  const { orderGroupId } = useParams(); // Get orderGroupId from URL
  const [orderData, setOrderData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderGroupId) {
      setError("Order Group ID is missing.");
      setLoading(false);
      return;
    }

    // Fetch order details for the given orderGroupId
    fetch(
      `http://localhost/minnano/backend/getOrderDetails.php?orderGroupId=${orderGroupId}`,
      {
        method: "GET",
        credentials: "include", // Ensure session data is sent
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Log the full response for verification
        console.log("Full API response:", data);

        if (data.success) {
          setOrderData(data.data || {}); // Store entire response data for full verification
        } else {
          setError(data.error || "Failed to fetch order details.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data.");
        setLoading(false);
      });
  }, [orderGroupId]); // Run the effect again if orderGroupId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="order-details-container">
      {/* Displaying the full order data as a raw JSON object */}
      <Row>
        <Col md={12}>
          <h3>Full API Response Data:</h3>
          <pre>{JSON.stringify(orderData, null, 2)}</pre>{" "}
          {/* Pretty print the full response */}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
