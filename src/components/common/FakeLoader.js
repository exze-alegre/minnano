import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap";

const FakeLoader = forwardRef(({ nextPage, loadingDelay = 400 }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Expose the startLoading function to the parent component
  useImperativeHandle(ref, () => ({
    startLoading() {
      setIsLoading(true);
      // Simulate a delay before navigation
      setTimeout(() => {
        setIsLoading(false); // Hide the loader
        navigate(nextPage);
      }, loadingDelay); // Use the passed loadingDelay prop
    },
  }));

  return (
    <Modal
      show={isLoading}
      centered
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" className="text-danger" />
        <span className="ms-3 my-5">Loading...</span>
      </Modal.Body>
    </Modal>
  );
});

export default FakeLoader;
