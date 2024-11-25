import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(
          "http://localhost/minnano/backend/checkLogin.php",
          { withCredentials: true }
        );
        console.log(response.data); // Debug response
        if (response.data.loggedIn) {
          setLoggedIn(true);
          setUserProfile(response.data.user);
        } else {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLogin();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleBrandClick = () => {
    navigate("/");
  };

  const handleBasketClick = () => {
    navigate("/basket");
  };

  return (
    <Navbar expand="lg" className="header pt-4">
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
                  <FaRegUser className="profile" />
                </Nav.Link>
              ) : (
                <Nav.Link href="#signup" className="signup">
                  <strong>Sign Up</strong>
                </Nav.Link>
              )}
              <Nav.Link href="#Likes">
                <FaRegHeart className="likes" />
              </Nav.Link>
              <Nav.Link onClick={handleBasketClick}>
                <FaShoppingBasket className="basket" />
              </Nav.Link>
            </div>
          </Col>
        </Row>

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
