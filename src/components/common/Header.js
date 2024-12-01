import React, { useState, useEffect, useRef } from "react";
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
import FakeLoader from "../common/FakeLoader";
import Minnano from "../assets/minnano.png";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const loaderRefLogin = useRef();
  const loaderRefHome = useRef();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(
          "http://localhost/minnano/backend/checkLogin.php",
          { withCredentials: true }
        );
        if (response.data.loggedIn) {
          setLoggedIn(true);
          setUserProfile(response.data.user); // Store user details if needed
        } else {
          setLoggedIn(false);
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

  const handleSignupClick = () => {
    loaderRefLogin.current.startLoading(); // Trigger the loader
  };

  const handleBasketClick = () => {
    if (loggedIn) {
      navigate("/basket");
    } else {
      handleSignupClick();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost/minnano/backend/logout.php",
        null,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      if (response.data.status === "success") {
        setLoggedIn(false); // Update the state to reflect logged out status
        setUserProfile(null); // Clear user profile data
        loaderRefHome.current.startLoading(); // Trigger loader for navigation
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
                src={Minnano}
                className="d-inline-block"
                style={{ marginBottom: "10px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "5px", display: "inline-block" }}>
                MINNANO
              </span>
            </Navbar.Brand>
          </Col>
          <Col xs={8}>
            <Form inline onSubmit={handleSearch}>
              <InputGroup className="custom-search">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
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
                <div
                  style={{ position: "relative" }}
                  onMouseEnter={() => setDropdownVisible(true)}
                  onMouseLeave={() => setDropdownVisible(false)}
                >
                  <FaRegUser className="profile" />
                  {dropdownVisible && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: 10,
                      }}
                    >
                      <button
                        onClick={() => navigate("/orders")}
                        className="dropdown-item"
                      >
                        Orders
                      </button>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Nav.Link onClick={handleSignupClick}>
                  <strong className="signup">Sign Up</strong>
                </Nav.Link>
              )}
              <Nav.Link href="#Likes">
                <FaRegHeart className="likes" />
              </Nav.Link>
              <Nav.Link onClick={handleBasketClick}>
                <FaShoppingBasket className="basket" />
              </Nav.Link>
            </div>
            <FakeLoader ref={loaderRefLogin} nextPage="/login" />
            <FakeLoader ref={loaderRefHome} nextPage="/" />
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
