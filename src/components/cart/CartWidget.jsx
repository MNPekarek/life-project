import { useState } from "react";
import { useAppContext } from "../context/Context";
import CartDropdown from "./CartDropdown";
import { FiShoppingCart } from "react-icons/fi";

function CartWidget() {
  const { carrito } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div style={{ display: "flex"}}>
      <div
        onClick={toggleDropdown}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <FiShoppingCart />
        {dropdownOpen && (
          <div>
            <CartDropdown />
          </div>
        )}
      </div>
      <span> {carrito.reduce((acc, el) => acc + el.cantidad ,0)} </span>
    </div>
  );
}

export default CartWidget;
