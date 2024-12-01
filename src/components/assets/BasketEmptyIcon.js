import { FaShoppingBasket } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";
import { IconContext } from "react-icons";

const BasketEmptyIcon = () => {
  return (
    <IconContext.Provider value={{ size: "2em", color: "#000" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Shopping Basket Icon */}
        <FaShoppingBasket
          style={{
            color: "#F1AEB5",
          }}
        />

        {/* Exclamation Icon */}
        <FaExclamation
          className="exclamation"
          style={{
            position: "absolute",
            top: "-5px", // Move the exclamation mark up slightly
            right: "-5px", // Adjust right position for better alignment
            fontSize: "0.7em", // Scale down the exclamation mark size
            color: "#E9868F",
          }}
        />
      </div>
    </IconContext.Provider>
  );
};

export default BasketEmptyIcon;
