import React, { useEffect, useState, useRef } from "react";
import Header from "../common/Header";
import ShippingAddress from "../common/ShippingAdress";
import { Container, Row, Col, Button } from "react-bootstrap";
import FakeLoader from "../common/FakeLoader";
import CustomDropdown from "../common/CustomDropdown"; // You can still keep the CustomDropdown for the payment method
import VoucherModal from "../common/VoucherModal"; // Import the new VoucherModal
import "../../styles/Checkout.scss";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [userId, setUserId] = useState(null); // State to store user_id from session
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const loaderRef = useRef();

  useEffect(() => {
    const storedCheckoutItems = JSON.parse(
      localStorage.getItem("checkoutItems")
    );
    if (storedCheckoutItems) {
      setCheckoutItems(storedCheckoutItems);
    }
    console.log(JSON.stringify(storedCheckoutItems));

    fetch("http://localhost/minnano/backend/getVouchers.php")
      .then((response) => response.json())
      .then((data) => setVouchers(data))
      .catch((error) => console.error("Error fetching vouchers:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost/minnano/backend/getUserIdFromSession.php", {
      method: "GET",
      credentials: "include", // Make sure cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response to inspect the session and user data
        if (data.status === "success") {
          setUserId(data.user.user_id); // Set user_id in state
        } else {
          alert(data.message || "Failed to retrieve user ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
        alert("An error occurred while fetching the user ID.");
      });
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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    id: 1,
    variation_name: "Cash on Delivery",
  });

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const merchandiseSubtotal = checkoutItems.reduce(
    (total, item) => total + item.discount_price * item.quantity,
    0
  );

  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let voucherDiscount = 0;
  if (selectedVoucher) {
    if (selectedVoucher.discount_type === "percentage") {
      voucherDiscount =
        merchandiseSubtotal * (selectedVoucher.discount_value / 100);
    } else if (selectedVoucher.discount_type === "fixed") {
      voucherDiscount = selectedVoucher.discount_value;
    }
  }
  // Apply voucher discount to merchandise subtotal and add shipping fee
  let totalPayment = merchandiseSubtotal - voucherDiscount;
  const shippingFee = 120; // Hardcoded shipping fee
  totalPayment += shippingFee;
  // Add shipping fee to total payment

  const savedAmount = (
    totalPrice -
    merchandiseSubtotal -
    voucherDiscount
  ).toFixed(2);

  const placeOrder = async () => {
    loaderRef.current.startLoading(); // Trigger the loader
    console.log("Current User ID:", userId); // Log the user ID to the console

    // Check if userId is available from state
    if (userId === null) {
      alert("User is not logged in.");
      return; // Exit if no user ID is found
    }

    // Construct the orderData dynamically from the checkoutItems and additional fields
    const orderData = {
      user_id: userId, // Use user_id from state
      items: checkoutItems.map((item) => ({
        basket_item_id: item.basket_item_id,
        price: item.price,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        discount_price: item.discount_price,
        image: item.selected_variation.image,
        variation_name: item.selected_variation.variation_name,
        variation_id: item.variation_id,
        shipping: shippingFee,
        total_payment: totalPayment,
        payment_method: selectedPaymentMethod
          ? selectedPaymentMethod.variation_name
          : "N/A",
        saved: savedAmount,
      })),
    };

    console.log("Order Data Sent:", orderData); // Log the order data being sent

    try {
      const response = await fetch(
        "http://localhost/minnano/backend/addToOrders.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          credentials: "include", // Important to include the session cookie
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Log the response from the backend

      if (data.success) {
        alert(
          `Order placed successfully! Order Group ID: ${data.order_group_id}`
        );
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

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
            <Row className="mt-3 message-for-seller">
              <Col>
                <h5>Message for Seller</h5>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Leave a message for the seller (optional)"
                />
              </Col>
            </Row>
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
                title={selectedPaymentMethod.variation_name} // Use the default payment method
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
                <p>Saved: ₱ {savedAmount}</p>
                <hr />
                <h5>Total Payment: ₱{totalPayment}</h5>
              </div>

              <Button
                variant="danger"
                className="place-order-btn"
                onClick={placeOrder}
              >
                Place Order
              </Button>
              <FakeLoader ref={loaderRef} nextPage="/order-successful" />
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
