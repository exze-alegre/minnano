//Header.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FaSearch,
  FaRegHeart,
  FaRegUser,
  FaShoppingBasket,
} from "react-icons/fa";
import {
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import "../../styles/Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ loggedIn, userProfile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery) {
      // Redirect to the search results page with the query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Function to navigate to homepage when brand is clicked
  const handleBrandClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <Navbar expand="lg header pt-4">
      <Container className="d-flex flex-column">
        {/* Top Header */}
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
          <Col xs={8}>
            <Form inline onSubmit={handleSearch}>
              <InputGroup className="custom-search">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="SearchBar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputGroup.Text id="SearchBar" className="search-icon-bg">
                  <Button variant="link" onClick={handleSearch}>
                    <FaSearch className="search-icon" />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </Col>
          <Col>
            <div className="d-flex justify-content-end align-items-center gap-3">
              {loggedIn ? (
                <Nav.Link href="#profile">
                  <FaRegUser />
                </Nav.Link>
              ) : (
                <Nav.Link href="#signup" className="signup">
                  <strong>Sign Up</strong>
                </Nav.Link>
              )}
              <Nav.Link href="#Likes">
                <FaRegHeart className="likes" />
              </Nav.Link>
              <Nav.Link href="#Basket">
                <FaShoppingBasket className="basket" />
              </Nav.Link>
            </div>
          </Col>
        </Row>

        {/* Bottom Navigation */}
        <Row className="w-100 justify-content-md-center bottom-nav">
          <Col xs="auto">
            <Nav.Link href="#New">
              <strong>NEW</strong>
            </Nav.Link>
          </Col>
          <Col xs="auto">
            <Nav.Link href="#BestSeller">
              <strong>BEST SELLER</strong>
            </Nav.Link>
          </Col>
          <Col xs="auto">
            <Nav.Link href="#Trending">
              <strong>TRENDING</strong>
            </Nav.Link>
          </Col>
          <Col xs="auto">
            <Nav.Link href="#Plushies">
              <strong>PLUSHIES</strong>
            </Nav.Link>
          </Col>
          <Col xs="auto">
            <Nav.Link href="#KeyChains">
              <strong>KEYCHAINS</strong>
            </Nav.Link>
          </Col>
          <Col xs="auto">
            <Nav.Link href="#Crochet">
              <strong>CROCHET</strong>
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
