import React from "react";
import {
  Modal,
  Button,
  ListGroup,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";

const VoucherModal = ({
  show,
  onClose,
  vouchers,
  onSelectVoucher,
  selectedVoucher,
  merchandiseSubtotal, // Accept merchandiseSubtotal as a prop
}) => {
  // Function to handle voucher selection
  const handleVoucherClick = (voucher) => {
    if (merchandiseSubtotal >= voucher.min_spend) {
      // If the minimum spend is met, select the voucher
      onSelectVoucher(voucher);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select a Voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {vouchers.map((voucher) => {
            const isEligible = merchandiseSubtotal >= voucher.min_spend;

            return (
              <ListGroup.Item
                key={voucher.id}
                action
                onClick={() => handleVoucherClick(voucher)}
                style={{
                  padding: "15px",
                  cursor: isEligible ? "pointer" : "not-allowed",
                  opacity: isEligible ? 1 : 0.6,
                }}
                className={
                  selectedVoucher && selectedVoucher.id === voucher.id
                    ? "selected"
                    : ""
                }
              >
                <Row className="align-items-center">
                  {/* Image Column */}
                  <Col xs={3} className="d-flex justify-content-center">
                    <img
                      src="https://via.placeholder.com/200"
                      alt="Voucher Image"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </Col>

                  {/* Voucher Details Column */}
                  <Col xs={7} className="d-flex flex-column">
                    <Row className="voucher-code ">{voucher.code}</Row>
                    <Row className="voucher-description">
                      {voucher.discount_type === "percentage"
                        ? `${voucher.discount_value}% off`
                        : `${voucher.discount_value} off`}
                    </Row>
                    <Row className="voucher-minimum-spend mt-2">
                      Minimum Spend: ₱{voucher.min_spend}
                    </Row>
                  </Col>

                  {/* Radio Button Column */}
                  <Col xs={2} className="d-flex justify-content-center">
                    <Form.Check
                      type="radio"
                      name="voucherSelection"
                      id={`voucher-${voucher.id}`}
                      checked={
                        selectedVoucher && selectedVoucher.id === voucher.id
                      }
                      onChange={() => onSelectVoucher(voucher)}
                      disabled={!isEligible} // Disable the radio button if not eligible
                    />
                  </Col>
                </Row>
                <Row>
                  {/* Message for vouchers that don't meet the minimum spend */}
                  {!isEligible && (
                    <div className="mt-2 text-start text-danger">
                      <small>*Does not meet required minimum spend</small>
                    </div>
                  )}
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoucherModal;
