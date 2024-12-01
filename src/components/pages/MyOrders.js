import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import { FaBox } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Button,
  Spinner,
} from "react-bootstrap";
import "../../styles/MyOrders.scss";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("onShipping");
  const [isReceivedEnabled, setIsReceivedEnabled] = useState(false); // Track if the button is enabled

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "http://localhost/minnano/backend/getOrders.php",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.error);
      }
      setLoading(false);
    };

    fetchOrders();

    // Check localStorage or sessionStorage for previously visited details page
    const visitedDetails = sessionStorage.getItem("visitedDetails");
    if (visitedDetails === "true") {
      setIsReceivedEnabled(true); // Enable the "Order Received" button if they have visited the details page
    }
  }, []);

  // Group orders by order_group_id
  const groupOrders = () => {
    return orders.reduce((acc, order) => {
      const { order_group_id } = order;
      if (!acc[order_group_id]) {
        acc[order_group_id] = [];
      }
      acc[order_group_id].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrders();

  // Filter orders by status_id dynamically
  const filterOrdersByStatus = (statusId) => {
    return Object.keys(groupedOrders).reduce((filtered, groupId) => {
      const group = groupedOrders[groupId].filter(
        (order) => order.status_id === statusId
      );
      if (group.length) filtered[groupId] = group;
      return filtered;
    }, {});
  };

  const updateOrderStatus = async (orderId) => {
    const formData = new URLSearchParams();
    formData.append("orderId", orderId);
    formData.append("newStatus", 2); // Status 2 for 'arrived'

    const response = await fetch(
      "http://localhost/minnano/backend/updateOrderStatus.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        credentials: "include",
      }
    );
    window.location.reload();
    const data = await response.json();
    if (data.success) {
      // Update the order status in the UI
      const updatedOrders = orders.map((order) =>
        order.order_id === orderId ? { ...order, status_id: 2 } : order
      );
      setOrders(updatedOrders);
    } else {
      setError(data.error);
    }
  };

  // Render orders based on status
  const renderOrders = (filteredOrders) => {
    return Object.keys(filteredOrders).length > 0 ? (
      Object.keys(filteredOrders).map((groupId) => {
        const group = filteredOrders[groupId];
        return (
          <div
            key={groupId}
            className="order-group-container"
            style={{
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <div className="d-flex justify-content-between pt-3 px-3 pb-1">
              <Col className="d-flex">
                <Col
                  xs="auto"
                  className="d-flex flex-column justify-content-center px-1"
                >
                  <Row className="p-0 m-0">Order ID:</Row>
                  <Row className="p-0 m-0">#{groupId}</Row>
                </Col>
              </Col>
              <Col xs="auto" className="d-flex pb-0">
                <Col xs="auto" className="d-flex align-items-center">
                  <p className="border rounded-pill m-0 me-2 px-3 p-2 bg-light">
                    Estimated Delivery: December 3, 2025
                  </p>
                </Col>
                <Col
                  xs="auto"
                  className="d-flex align-items-center justify-content-center"
                >
                  <p className="border rounded-pill m-0 px-3 p-2">On Deliver</p>
                </Col>
              </Col>
            </div>

            {group.map((order) => (
              <div key={order.order_id} className="order-items py-2 ">
                <Row>
                  <Col xs={2} className="d-flex justify-content-center">
                    {order.image && (
                      <img
                        src={order.image}
                        alt={order.product_name || "Product Image"}
                        className="m-0"
                        style={{
                          maxWidth: "100%",
                          height: "100px",
                        }}
                      />
                    )}
                  </Col>
                  <Col
                    xs={8}
                    className="d-flex flex-column justify-content-between"
                  >
                    <Row className="order-product-name">
                      {order.product_name}
                    </Row>
                    <Row>Variation: {order.variation_name || "N/A"}</Row>
                    <div className="mt-auto">
                      <Row>Quantity: {order.quantity}</Row>
                    </div>
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex flex-column align-items-end px-4"
                  >
                    <Row className="order-discount pe-3">
                      ₱{order.discount_price}
                    </Row>
                    <Row>
                      <s className="order-price p-0 pe-3">₱{order.price}</s>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
            <div className="d-flex justify-content-between p-0 m-0 bg-light">
              <Col xs={8} className="d-flex ">
                <Col
                  xs="auto"
                  className="d-flex flex-column justify-content-center"
                >
                  <p className=" ps-3 m-0 ">Order Total:</p>
                </Col>
                <Col
                  xs="auto"
                  className="d-flex flex-column justify-content-center"
                >
                  <p className="total-price ps-2 m-0 fs-3">
                    ₱{group[0].total_payment}
                  </p>
                </Col>
              </Col>
              <Col xs="auto" className="d-flex justify-content-end">
                <Button
                  variant="danger"
                  className="rounded-pill px-4 ms-3 my-3"
                  onClick={() => updateOrderStatus(group[0].order_id)}
                  disabled={
                    sessionStorage.getItem("visitedGroupId") !== groupId
                  } // Disable the button if the groupId doesn't match
                >
                  Order Received
                </Button>
              </Col>
              <Col xs="auto" className="d-flex justify-content-end">
                <Button
                  variant="danger"
                  className="rounded-pill px-4 m-3"
                  onClick={() => {
                    // Store the groupId of the clicked order group in sessionStorage
                    sessionStorage.setItem("visitedGroupId", groupId);
                    setIsReceivedEnabled(true); // Enable the "Order Received" button
                    navigate(`/order/${groupId}`); // Navigate to the order details page
                  }}
                >
                  Details
                </Button>
              </Col>
            </div>
          </div>
        );
      })
    ) : (
      <div className="no-orders-container">
        <FaBox className="no-orders-icon" />
        <p className="no-orders-text">No orders in this status.</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="order-page">
        <Header />
        <Container className="order-page-container">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" variant="danger" />
            <h3 className="ms-3">Loading Orders...</h3>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="order-page">
      <Header />
      <Container className="order-page-container mt-0">
        <BackButton />
        <Container className="tabs-container">
          <Tab.Container
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
            <Nav
              variant="pills"
              className="mb-3 d-flex justify-content-center bg-light rounded-pill p-2 w-100"
            >
              <Col>
                <Nav.Item>
                  <Nav.Link
                    eventKey="onShipping"
                    className={`text-center mx-2 rounded-pill ${
                      activeTab === "onShipping" ? "active-tab" : ""
                    }`}
                  >
                    On Shipping
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item>
                  <Nav.Link
                    eventKey="arrived"
                    className={`text-center mx-2 rounded-pill ${
                      activeTab === "arrived" ? "active-tab" : ""
                    }`}
                  >
                    Arrived
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item>
                  <Nav.Link
                    eventKey="completed"
                    className={`text-center mx-2 rounded-pill ${
                      activeTab === "completed" ? "active-tab" : ""
                    }`}
                  >
                    Completed
                  </Nav.Link>
                </Nav.Item>
              </Col>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="onShipping">
                {renderOrders(filterOrdersByStatus(1))}
              </Tab.Pane>
              <Tab.Pane eventKey="arrived">
                {renderOrders(filterOrdersByStatus(2))}
              </Tab.Pane>
              <Tab.Pane eventKey="completed">
                {renderOrders(filterOrdersByStatus(3))}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </Container>
    </div>
  );
};

export default MyOrders;
