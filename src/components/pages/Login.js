import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect on successful login\
import Container from "react-bootstrap/Container";
import "../../styles/Login.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate inputs
    if (username.trim() === "" || password.trim() === "") {
      setError("Both fields are required.");
      return;
    }

    const endpoint = isRegister
      ? `${process.env.REACT_APP_API_URL}/register`
      : `${process.env.REACT_APP_API_URL}/login`;

    setLoading(true); // Show loading state
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (isRegister) {
          alert("Registration successful! You can now log in.");
          setIsRegister(false); // Switch to login mode
        } else {
          // Login successful
          localStorage.setItem("token", data.token); // Save token
          navigate("/home"); // Redirect to Home.js
        }
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <Container fluid className="bg-red py-3 min-vh-100 d-flex flex-column">
      {/* Header */}
      <Row className="align-items-center justify-content-between pt-0">
        <Col xs="auto" className="m-2">
          <img src="https://via.placeholder.com/99" alt="Logo" />
        </Col>
        <Col xs={9} className="text-start">
          <h2 className="mb-1">MINNANO</h2>
          <p className="mb-0">Everyone’s online Shopping mall</p>
        </Col>
        <Col xs={2} className="">
          <a href="#">Need Help papi?</a>
        </Col>
      </Row>
      {/* Body */}
      <Row className="flex-grow-1 justify-content-center align-items-center body-row">
        <Col xs={6} className="text-center">
          <img src="https://via.placeholder.com/387" alt="Placeholder" />
        </Col>

        <Col xs={6} className="text-center">
          <div className="login-right">
            <div
              className="login-form"
              style={{
                backgroundColor: "#D96565",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h2>{isRegister ? "Register" : "Login"}</h2>
              {error && (
                <p className="error" style={{ color: "white" }}>
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="username"
                    className="d-block text-start"
                    style={{ marginBottom: "5px" }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginBottom: "15px",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="d-block text-start"
                    style={{ marginBottom: "5px" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginBottom: "15px",
                    }}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    {loading
                      ? "Processing..."
                      : isRegister
                      ? "Register"
                      : "Login"}
                  </button>
                </div>
              </form>
              <div className="social-buttons gap-4">
                <Navbar className="bg-body-tertiary px-2">
                  <Container>
                    <Navbar.Brand href="#home">
                      <img
                        alt=""
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                      />{" "}
                      Facebook
                    </Navbar.Brand>
                  </Container>
                </Navbar>
                <Navbar className="bg-body-tertiary px-2">
                  <Container>
                    <Navbar.Brand href="#home">
                      <img
                        alt=""
                        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                      />{" "}
                      Google
                    </Navbar.Brand>
                  </Container>
                </Navbar>
              </div>
              <p className="text-center">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
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
            </div>
          </div>
        </Col>
      </Row>
      {/* Footer */}
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
    </Container>
  );
};
export default Login;
