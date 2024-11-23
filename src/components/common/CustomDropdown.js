import React from "react";
import { DropdownButton, Dropdown as BootstrapDropdown } from "react-bootstrap";
import "../../styles/CustomDropdown.scss";

const CustomDropdown = ({ title, items, onSelect }) => {
  return (
    <DropdownButton
      id="custom-dropdown"
      title={title}
      className="custom-dropdown"
      variant="light"
    >
      {items && items.length > 0 ? (
        items.map((item) => (
          <BootstrapDropdown.Item key={item.id} onClick={() => onSelect(item)}>
            {item.variation_name}
          </BootstrapDropdown.Item>
        ))
      ) : (
        <BootstrapDropdown.Item disabled>
          No items available
        </BootstrapDropdown.Item>
      )}
    </DropdownButton>
  );
};

export default CustomDropdown;
