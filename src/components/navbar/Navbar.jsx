import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import CartWidget from "../cart/CartWidget";
import { useNavigate } from "react-router-dom";

motion;
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Header
      as={motion.header}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Nav>
        <Logo onClick={() => navigate("/")}>
          <img src="/logo22.jpg" alt="" />
          🌿 Saludable
        </Logo>

        <NavLinks>
          <li>
            <a onClick={() => navigate("/categoria/aceites y vinagres")}>
              Aceites y vinagres
            </a>
          </li>
          <li>
            <a>Snacks</a>
            <ul>
              <li>
                <a onClick={() => navigate("/categoria/Snacks salados")}>
                  Snacks salados
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/categoria/Snacks dulces")}>
                  Snacks dulces
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a>Frutas y frutos</a>
            <ul>
              <li>
                <a onClick={() => navigate("/categoria/Frutos Secos")}>
                  Frutos Secos
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/categoria/Frutas deshidatadas")}>
                  Frutas deshidatadas
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a>Desayuno y repostería</a>
            <ul>
              <li>
                <a onClick={() => navigate("/categoria/Cereales")}>Cereales</a>
              </li>
              <li>
                <a
                  onClick={() =>
                    navigate("/categoria/Reposteria e ingredientes")
                  }
                >
                  Repostería e ingredientes
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a>Varios</a>
            <ul>
              <li>
                <a onClick={() => navigate("/categoria/Condimentos")}>
                  Condimentos
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/categoria/legumbres")}>
                  Legumbres
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/categoria/infusiones y cafe")}>
                  Infusiones y café
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/categoria/semillas")}>Semillas</a>
              </li>
              <li>
                <a onClick={() => navigate("/categoria/varios")}>Varios</a>
              </li>
            </ul>
          </li>
        </NavLinks>

        <RightWrapper>
          <CartIcon
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CartWidget />
          </CartIcon>
        </RightWrapper>
        <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>☰</MenuToggle>
      </Nav>
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <li>
              <a onClick={() => navigate("/categoria/aceites y vinagres")}>
                Aceites y vinagres
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/Frutos Secos")}>
                Frutos Secos
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/Frutas deshidatadas")}>
                Frutas deshidatadas
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/Snacks salados")}>
                Snacks salados
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/Snacks dulces")}>
                Snacks dulces
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/Condimentos")}>
                Condimentos
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/legumbres")}>Legumbres</a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/infusiones y cafe")}>
                Infusiones y café
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/categoria/Reposteria e ingredientes")}
              >
                Repostería e ingredientes
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/Cereales")}>Cereales</a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/semillas")}>Semillas</a>
            </li>
            <li>
              <a onClick={() => navigate("/categoria/varios")}>Varios</a>
            </li>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Header>
  );
};

export default Navbar;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #b6e1a7, #5cb477);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 50px;
    width: auto;
    object-fit: contain;
    margin: 0.5rem;
    border-radius: 5rem;
  }
  font-size: 1.5rem;
  font-weight: bold;
  color: #397c43;
`;

const MenuToggle = styled.button`
  font-size: 1.6rem;
  background: none;
  border: none;
  color: #397c43;
  padding: 0;
  display: none;

  @media (max-width: 768px) {
    display: block;
    padding-right: 1.5rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  li {
    position: relative;

    a {
      color: #397c43;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem;
      display: block;
      cursor: pointer;
    }

    ul {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background: linear-gradient(135deg, #b6e1a7, #5cb477);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      padding: 0.5rem 0;
      z-index: 999;
      min-width: 180px;

      li {
        a {
          padding: 0.5rem 1rem;
          color: #374151;
          white-space: nowrap;

          &:hover {
            background-color: #f3f4f6;
          }
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.ul)`
  position: fixed;
  top: 65px;
  right: 0;
  background: linear-gradient(135deg, #b6e1a7, #5cb477);
  width: 70%;
  height: 100vh;
  padding: 2rem;
  list-style: none;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);

  li {
    margin-bottom: 1.5rem;
  }

  li a {
    text-decoration: none;
    color: #397c43;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 769px) {
    padding-right: 2rem;
    gap: 1.5rem;
  }
`;

const CartIcon = styled(motion.div)`
  color: #397c43;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  cursor: pointer;
  @media (max-width: 769px) {
    padding-left: 1.5rem;
  }
`;
