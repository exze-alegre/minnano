// components/common/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#F8F8F8", padding: "20px", marginTop: "40px" }}
    >
      <Container>
        <Row className="justify-content-center text-start g-5">
          <Col xs={2} className="d-flex flex-column align-items-start">
            <b className="mb-2">Customer Service</b>
            <p className="mb-2">Help Center</p>
            <p className="mb-2">Order Tracking</p>
          </Col>
          <Col xs={2} className="d-flex flex-column align-items-start">
            <b className="mb-2">About MINNANO</b>
            <p className="mb-2">About Us</p>
            <p className="mb-2">Email</p>
          </Col>
          <Col xs={2} className="d-flex flex-column align-items-start">
            <b className="mb-2">Follow us</b>
            <p className="mb-2">Facebook</p>
            <p className="mb-2">Instagram</p>
          </Col>
          <Col xs={2} className="d-flex flex-column align-items-start">
            <b className="mb-2">Gikapoy nako</b>
            <p className="mb-2">Why does it have to be this way</p>
            <p className="mb-2">100 points na please</p>
          </Col>
        </Row>
        <hr />
        <Row className="align-items-center">
          {/* Left-aligned paragraph */}
          <Col>
            <p style={{ fontSize: "20px", color: "#666", marginBottom: "0" }}>
              © 2024 MINNANO. All rights reserved.
            </p>
          </Col>
          {/* Center-aligned paragraph */}
          <Col className="text-center">
            <p style={{ fontSize: "20px", color: "#666", marginBottom: "0" }}>
              Ginama ni Rekzel ug Kairu
            </p>
          </Col>
          {/* Right-aligned paragraph */}
          <Col className="text-end">
            <p style={{ fontSize: "20px", color: "#666", marginBottom: "0" }}>
              Terms of Service
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
