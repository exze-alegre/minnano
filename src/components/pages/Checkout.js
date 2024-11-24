import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import ShippingAddress from "../common/ShippingAdress";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomDropdown from "../common/CustomDropdown"; // You can still keep the CustomDropdown for the payment method
import VoucherModal from "../common/VoucherModal"; // Import the new VoucherModal
import "../../styles/Checkout.scss";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  useEffect(() => {
    const storedCheckoutItems = JSON.parse(
      localStorage.getItem("checkoutItems")
    );
    if (storedCheckoutItems) {
      setCheckoutItems(storedCheckoutItems);
    }

    fetch("http://localhost/minnano/backend/getVouchers.php")
      .then((response) => response.json())
      .then((data) => setVouchers(data))
      .catch((error) => console.error("Error fetching vouchers:", error));
  }, []);

  const handleVoucherSelect = (voucher) => {
    const merchandiseSubtotal = checkoutItems.reduce(
      (total, item) => total + item.discount_price * item.quantity,
      0
    );

    // Check if the voucher's minimum spend is met
    if (merchandiseSubtotal >= voucher.min_spend) {
      setSelectedVoucher(voucher);
      setShowVoucherModal(false);
    } else {
      alert(`Voucher requires a minimum spend of ₱${voucher.min_spend}`);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const merchandiseSubtotal = checkoutItems.reduce(
    (total, item) => total + item.discount_price * item.quantity,
    0
  );

  let totalPayment = merchandiseSubtotal;

  // Apply voucher discount
  if (selectedVoucher) {
    if (selectedVoucher.discount_type === "percentage") {
      totalPayment -=
        merchandiseSubtotal * (selectedVoucher.discount_value / 100);
    } else if (selectedVoucher.discount_type === "fixed") {
      if (merchandiseSubtotal >= selectedVoucher.min_spend) {
        totalPayment -= selectedVoucher.discount_value;
      }
    }
  }

  // Add shipping fee to total payment
  const shippingFee = 120; // Hardcoded shipping fee
  totalPayment += shippingFee;

  totalPayment = totalPayment < 0 ? 0 : totalPayment.toFixed(2);

  return (
    <div className="checkout-page">
      <Header />
      <Container className="checkout-page-container mt-3">
        <Row className="checkout-row px-4">
          <ShippingAddress />
        </Row>
        <Row className="px-5">
          <Col md={8}>
            <div className="checkout-items-container">
              {checkoutItems.length > 0 ? (
                checkoutItems.map((item) => (
                  <div
                    key={item.basket_item_id}
                    className="checkout-item-container p-1 mb-2"
                  >
                    <Row>
                      <Col xs={2} className="d-flex align-items-center">
                        {item.selected_variation?.image && (
                          <img
                            src={item.selected_variation.image}
                            alt={
                              item.selected_variation.variation_name ||
                              "Variation Image"
                            }
                            className="m-0"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        )}
                      </Col>
                      <Col
                        xs={8}
                        className="d-flex flex-column justify-content-between"
                      >
                        <Row className="product-name">{item.product_name}</Row>
                        <Row>
                          Variation:{" "}
                          {item.selected_variation?.variation_name || "N/A"}
                        </Row>
                        <div className="mt-auto">
                          <Row>Quantity: {item.quantity}</Row>
                        </div>
                      </Col>
                      <Col
                        xs={2}
                        className="d-flex flex-column align-items-end px-4"
                      >
                        <Row className="discount">₱{item.discount_price}</Row>
                        <Row>
                          <s className="price p-0">₱{item.price}</s>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p>No items in the cart</p>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="payment-summary">
              <h4>Voucher</h4>
              <Button
                variant="light"
                className="w-100 mb-2 select-voucher-btn"
                onClick={() => setShowVoucherModal(true)}
              >
                {selectedVoucher ? selectedVoucher.code : "Select Voucher"}
              </Button>

              <h4>Payment Method</h4>
              <CustomDropdown
                title="Cash on Delivery"
                items={[
                  { id: 1, variation_name: "Cash on Delivery" },
                  { id: 2, variation_name: "Credit Card" },
                ]}
                onSelect={handlePaymentMethodSelect}
              />

              <div className="order-summary">
                <h4>Order Summary</h4>
                <p>Merchandise Subtotal: ₱{merchandiseSubtotal.toFixed(2)}</p>
                <p>Shipping Subtotal: ₱{shippingFee}</p>
                {selectedVoucher && (
                  <p>
                    Discount ({selectedVoucher.code}): -₱
                    {selectedVoucher.discount_type === "percentage"
                      ? (
                          merchandiseSubtotal *
                          (selectedVoucher.discount_value / 100)
                        ).toFixed(2)
                      : Number(selectedVoucher.discount_value).toFixed(2)}
                  </p>
                )}
                <p>
                  Saved: ₱
                  {(merchandiseSubtotal - totalPayment + shippingFee).toFixed(
                    2
                  )}
                </p>
                <hr />
                <h5>Total Payment: ₱{totalPayment}</h5>
              </div>

              <Button variant="danger" className="place-order-btn">
                Place Order
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <VoucherModal
        show={showVoucherModal}
        onClose={() => setShowVoucherModal(false)} // Close the modal
        vouchers={vouchers}
        onSelectVoucher={handleVoucherSelect} // Handle voucher selection
        merchandiseSubtotal={merchandiseSubtotal} // Pass merchandiseSubtotal as a prop
      />
    </div>
  );
};

export default Checkout;
