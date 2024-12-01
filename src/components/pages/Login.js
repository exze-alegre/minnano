import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss";
import FakeLoader from "../common/FakeLoader";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Notifications from "../common/Notification"; // Import Notifications component
import Footer from "../common/Footer";
import Cookies from "js-cookie"; // Import the js-cookie library
import Minnano from "../assets/minnano255.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [notifications, setNotifications] = useState([]); // State to manage notifications
  const loaderRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Use this hook for navigation

  const handleButtonClick = () => {
    setIsRegister(!isRegister);
    loaderRef.current.startLoading();
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(value));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let errorMessages = [];

    if (!email) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: "Please enter your email." },
      ]);
      return; // Stop the submission
    }
    if (!password) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: "Please enter your password." },
      ]);
      return; // Stop the submission
    }

    if (!email && !password) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: "Please enter your login details." },
      ]);
      return; // Stop the submission
    }

    if (!emailValid && email) {
      errorMessages.push("Please enter a valid email address.");
    }

    if (errorMessages.length > 0) {
      setNotifications(
        errorMessages.map((message, index) => ({
          id: Date.now() + index,
          message,
        }))
      );
      return; // Stop the form submission if there are validation errors
    }

    // Start the loader
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/minnano/backend/login.php",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure credentials (cookies) are included
        }
      );

      if (response.data.status === "success") {
        setNotifications([]); // Clear notifications on success

        // Stop the loader and navigate
        loaderRef.current.startLoading(); // Trigger the loader
      } else {
        setNotifications([{ id: Date.now(), message: response.data.message }]);
        setIsLoading(false); // Stop the loader on failure
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
      setNotifications([
        {
          id: Date.now(),
          message: "An error occurred, please try again later.",
        },
      ]);
      setIsLoading(false); // Stop the loader if there's an error
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginSubmit(e); // Trigger the submit function when Enter key is pressed
    }
  };

  return (
    <div
      fluid
      className="login-page min-vh-100 d-flex flex-column px-0 overflow-hidden"
    >
      <Row className="login-header align-items-center justify-content-between py-1">
        <Col xs="auto" className="ms-5 px-0">
          <img src={Minnano} alt="Logo" style={{ width: "100px" }} />
        </Col>
        <Col xs={10} className="text-start">
          <h2 className="mb-0 text-danger">MINNANO</h2>
          <p className="mb-2">Everyone’s online Shopping mall</p>
        </Col>
        <Col xs={1}>
          <a href="#" className="text-danger">
            Need Help?
          </a>
        </Col>
      </Row>

      {/* Notification Component */}
      {notifications.length > 0 && (
        <Notifications notifications={notifications} />
      )}

      <Row className="d-flex justify-content-center align-items-center px-5">
        <Col xs={7} className="text-center">
          <img
            src={Minnano}
            alt="Placeholder"
            style={{
              width: "500px",
            }}
            className="rounded-circle"
          />
        </Col>

        <Col xs={5} className="text-center">
          <div className="login-right">
            <div
              className="login-form py-5"
              style={{
                backgroundColor: "#D96565",
                padding: "20px",
                height: "500px",
                borderRadius: "px",
              }}
            >
              <h3 className="text-start text-light px-3 mb-4">
                {isRegister ? "Sign up" : "Sign in"}
              </h3>
              <Row>
                <Col>
                  <Form className="px-3 mb-2" onSubmit={handleLoginSubmit}>
                    <Form.Group controlId="formEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        style={{
                          width: "100%",
                          height: "50px",
                          borderRadius: "14px",
                        }}
                        className="placeholder-light-gray"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form className="px-3 pt-3" onKeyDown={handleKeyDown}>
                    <Form.Group controlId="formPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        style={{
                          width: "100%",
                          height: "50px",
                          borderRadius: "14px",
                        }}
                        className="placeholder-light-gray"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Row className="forgor d-flex justify-content-between px-3 pt-1 mb-4">
                      <Row className="d-flex align-items-center w-100 mx-1 px-4 mt-2 mb-3">
                        <Col
                          xs={8}
                          className="d-flex justify-content-start p-0"
                        >
                          <p className="m-0">Forgot password?</p>
                        </Col>
                        <Col
                          xs={4}
                          className="d-flex justify-content-end align-items-end p-0"
                        >
                          <p className="m-0">Forgot Email?</p>
                        </Col>
                      </Row>
                      <Row className="mb-2 d-flex align-items-center w-100 mx-1 px-5">
                        <Col className="d-flex justify-content-center">
                          <Button
                            variant="danger"
                            className="w-100 text-light"
                            onClick={handleLoginSubmit} // Using onClick instead of type="submit"
                          >
                            {isRegister ? "Register" : "Login"}
                          </Button>
                          <FakeLoader
                            ref={loaderRef}
                            nextPage="/"
                            loadingDelay={1000}
                          />
                        </Col>
                      </Row>

                      <Row className="d-flex align-items-center w-100 mx-1 px-5">
                        <Col xs={5} className="p-0">
                          <hr className="bg-light m-0" />
                        </Col>
                        <Col xs={2} className="text-center">
                          <p className="text-light m-0">or</p>
                        </Col>
                        <Col xs={5} className="p-0">
                          <hr className="bg-light m-0" />
                        </Col>
                      </Row>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <Container className="d-flex justify-content-center gap-5">
                {/* Facebook Button */}
                <Button
                  variant="light"
                  className="d-flex align-items-center me-3"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook Logo"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                  Facebook
                </Button>

                {/* Google Button */}
                <Button variant="light" className="d-flex align-items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google Logo"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                  Google
                </Button>
              </Container>
              <div>
                <p className="text-center text-light mt-4">
                  {isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="toggle-button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {isRegister ? "Login" : "Register"}
                  </button>
                </p>

                <FakeLoader
                  ref={loaderRef}
                  nextPage={isRegister ? "/login" : "/login"}
                />
                {isLoading && <FakeLoader ref={loaderRef} nextPage={"/"} />}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Login;
