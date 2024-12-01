import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { IoReceipt } from "react-icons/io5";
import { IoIosCash } from "react-icons/io";
import { FaTruckMoving, FaBox, FaStar } from "react-icons/fa";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import OrderAddress from "../common/OrderAddress";
import DeliveryTimeline from "../common/DeliveryTimeline";
import Footer from "../common/Footer";
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

  // Calculate the subtotal, shipping, and saved amount
  const merchandiseSubtotal = orderData.items.reduce(
    (total, item) => total + item.discount_price * item.quantity,
    0
  );

  const totalPrice = orderData.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let savedAmount = totalPrice - merchandiseSubtotal;

  const shippingFee = 120; // Assuming shipping fee is fixed at 120
  const totalPayment = merchandiseSubtotal + shippingFee;

  return (
    <div className="order-details-page">
      <Header />
      <Container className="order-details-page-container">
        <BackButton />

        <Container className="order-details-container p-0 mb-5">
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
          <Row className="text-center mt-4 mb-5 position-relative">
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
          <Row className="">
            <Col xs={4}>
              <OrderAddress orderGroupId={orderGroupId} />
            </Col>
            <Col>
              <DeliveryTimeline />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs={7} className="mx-3">
              {/* Product details section */}
              {orderData.items.map((item, index) => (
                <Row
                  key={index}
                  className="order-detail-item-container d-flex align-items-start mb-3"
                >
                  {/* Product Image */}
                  <Col
                    xs={3}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="m-0"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                  </Col>

                  {/* Product Details */}
                  <Col
                    xs={7}
                    className="d-flex flex-column justify-content-between"
                  >
                    <Row className="product-name">{item.product_name}</Row>
                    <Row>Quantity: {item.quantity}</Row>
                    <Row className="mt-auto"></Row>
                  </Col>

                  {/* Discount Price */}
                  <Col
                    xs={2}
                    className="d-flex flex-column align-items-end px-4"
                  >
                    <Row className="discount">₱{item.discount_price}</Row>
                    <Row>
                      <s className="price p-0">₱{item.price}</s>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>

            <Col>
              {/* Price details */}
              <p>Merchandise Subtotal: ₱{merchandiseSubtotal.toFixed(2)}</p>
              <p>Shipping Subtotal: ₱{shippingFee.toFixed(2)}</p>
              <p>Saved: ₱{savedAmount.toFixed(2)}</p>
              <p>Total Payment: ₱{totalPayment.toFixed(2)}</p>

              <Row className="ms-2 me-4 mb-4 d-flex justify-content-start">
                <Button variant="danger" className="rate-btn">
                  Rate
                </Button>
                <Button variant="light" className="misc-btn">
                  Request for Return/Refund
                </Button>
                <Button variant="light" className="misc-btn">
                  Buy Again
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer /> {/* Footer is always at the bottom */}
    </div>
  );
};

export default OrderDetails;
