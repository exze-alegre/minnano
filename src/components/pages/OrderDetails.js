import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { IoReceipt } from "react-icons/io5";
import { IoIosCash } from "react-icons/io";
import { FaTruckMoving, FaBox, FaStar } from "react-icons/fa";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import OrderAddress from "../common/OrderAddress";
import DeliveryTimeline from "../common/DeliveryTimeline";
import "../../styles/OrderDetails.scss";

const OrderDetails = () => {
  const { orderGroupId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderGroupId) {
      setError("Order Group ID is missing.");
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost/minnano/backend/getOrderDetails.php?orderGroupId=${orderGroupId}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrderData(data.data || {});
        } else {
          setError(data.error || "Failed to fetch order details.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data.");
        setLoading(false);
      });
  }, [orderGroupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-details-page">
      <Header />
      <Container className="order-details-page-container">
        <BackButton />

        <Container className="order-details-container p-0">
          <div className="order-group d-flex justify-content-end">
            <Col xs="auto" className="d-flex align-items-center p-3">
              Order ID: {orderData.orderGroupId}
            </Col>
            <Col
              xs="auto"
              className="d-flex align-items-center justify-content-center"
            >
              <p className="border rounded-pill m-0 mx-2 px-3 p-2">
                On Deliver
              </p>
            </Col>
          </div>
          <Row className="text-center mt-4 position-relative">
            <Col className="position-relative">
              <div className="icon-container">
                <IoReceipt size={50} />
              </div>
              <p className="mt-2">Order Placed</p>
            </Col>
            <Col className="position-relative">
              <div className="icon-container">
                <IoIosCash size={50} />
              </div>
              <p className="mt-2">Payment Info Confirm</p>
            </Col>
            <Col className="position-relative">
              <div className="icon-container">
                <FaTruckMoving size={50} />
              </div>
              <p className="mt-2">Order Shipped Out</p>
            </Col>
            <Col className="position-relative">
              <div className="icon-container">
                <FaBox size={50} />
              </div>
              <p className="mt-2">Order Arrived</p>
            </Col>
            <Col className="position-relative">
              <div className="icon-container">
                <FaStar size={50} />
              </div>
              <p className="mt-2">To Rate</p>
            </Col>
          </Row>
          <Row>
            <Col xs={5}>
              <OrderAddress orderGroupId={orderGroupId} />
            </Col>
            <Col>
              <DeliveryTimeline />
            </Col>
          </Row>
          <Row>gay products</Row>

          {/* Insert the OrderAddress component here, passing orderGroupId as a prop */}
        </Container>
      </Container>
    </div>
  );
};

export default OrderDetails;
