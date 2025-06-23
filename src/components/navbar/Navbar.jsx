import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { FiShoppingCart  } from "react-icons/fi"


motion
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Header>
      <Nav>
        <Logo>
            <img src="/Imagen de WhatsApp 2025-06-21 a las 11.35.21_682dc4cf.webp" alt="" />
            🌿 Saludable</Logo>       
        
        <NavLinks>
          <li>
            <a href="#promos">Promociones</a>
          </li>
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </NavLinks>
         <FiShoppingCart />
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
            <li><a href="#promos" onClick={() => setMenuOpen(false)}>Promociones</a></li>
            <li><a href="#productos" onClick={() => setMenuOpen(false)}>Productos</a></li>
            <li><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
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
  }
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
`;

const MenuToggle = styled.button`
  font-size: 1.6rem;
  background: none;
  border: none;
  color: #fff;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  li a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.ul)`
  position: fixed;
  top: 60px;
  right: 0;
  background: #e8fbe5;
  width: 70%;
  height: 100vh;
  padding: 2rem;
  list-style: none;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);

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