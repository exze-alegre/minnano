import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "../../styles/Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginHeader = () => {
  const navigate = useNavigate();
  const handleBrandClick = () => {
    navigate("/");
  };
  return (
    <Navbar expand="lg header pt-4">
      <Container className="d-flex flex-column">
        <Row className="w-100 align-items-center mb-3">
          <Col>
            <Navbar.Brand
              onClick={handleBrandClick}
              style={{ cursor: "pointer" }}
            >
              <img
                alt="Minnano"
                src="https://via.placeholder.com/40"
                className="d-inline-block"
              />{" "}
              MINNANO
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default LoginHeader;
