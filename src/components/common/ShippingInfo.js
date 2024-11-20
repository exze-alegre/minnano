import React, { useState } from "react";
import { Accordion, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { GoPencil } from "react-icons/go";
import "../../styles/ShippingInfo.scss";

const ShippingInfo = ({ selectedCountry, setSelectedCountry }) => {
  const [country, setCountry] = useState("Philippines");
  const [activeDeliveryKey, setActiveDeliveryKey] = useState(null); // Default to null (closed)

  const handleCountrySelect = (country) => {
    setCountry(country);
  };

  const handleConfirmClick = () => {
    setActiveDeliveryKey(null); // Close the delivery accordion temporarily
  };

  return (
    <Accordion defaultActiveKey="0" className="mt-4 shipping-info-accordion">
      {/* Return & Shipping Info Accordion */}
      <Accordion.Item eventKey="0">
        <Accordion.Header>Return & Shipping Info</Accordion.Header>
        <Accordion.Body>
          <div className="return-shipping-info">
            <div className="info-item">
              <i className="bi bi-arrow-repeat"></i> {/* Icon for Returns */}
              <span>Free & Easy Returns</span>
            </div>
            <div className="info-item">
              <i className="bi bi-truck"></i> {/* Icon for Shipping */}
              <span>Shipping Discount</span>
              <span>for orders over ₱249</span>
            </div>
            <div className="info-item">
              <i className="bi bi-box"></i> {/* Icon for Local Shipping */}
              <span>Shipping to</span>
              <span>Shipped Locally</span>
            </div>
            <div className="info-item">
              <i className="bi bi-credit-card"></i>{" "}
              {/* Icon for Shipping Fee */}
              <span>Shipping Fee</span>
            </div>
          </div>

          {/* Nested Accordion for Deliver to Philippines */}
          <Accordion
            activeKey={activeDeliveryKey}
            onSelect={setActiveDeliveryKey}
            className="mt-3"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Deliver to {country || "Philippines"}
                <GoPencil className="ms-2" />
              </Accordion.Header>
              <Accordion.Body>
                <DropdownButton
                  id="country-dropdown"
                  title={country || "Select Country"}
                  variant="light"
                  className="w-100 my-3"
                >
                  <Dropdown.Item
                    onClick={() => handleCountrySelect("Philippines")}
                  >
                    Philippines
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCountrySelect("USA")}>
                    USA
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCountrySelect("Canada")}>
                    Canada
                  </Dropdown.Item>
                </DropdownButton>

                {/* Confirm Button */}
                <Button
                  className="confirm-button mt-3"
                  onClick={handleConfirmClick}
                >
                  Confirm
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ShippingInfo;
