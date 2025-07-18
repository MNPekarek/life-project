import { useState } from "react";
import { useAppContext } from "../context/Context";
import CartDropdown from "./CartDropdown";
import { FiShoppingCart } from "react-icons/fi";
import styled from "styled-components";

const NumberCartWidget = styled.p`
padding-left: 0.5rem;
font-size: 1.2rem;
text-align: center;
`;

function CartWidget() {
  const { carrito } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const totalItems = carrito.reduce((acc, el) => acc + el.cantidadCart, 0);

  return (
    <div style={{ display: "flex" }}>
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
      <NumberCartWidget>
        {totalItems !== 0 && <span>{totalItems} </span>}
      </NumberCartWidget>
    </div>
  );
}

export default CartWidget;
