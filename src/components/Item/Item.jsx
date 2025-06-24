import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/Context";
import { useState } from "react";

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  background-color: #fefdf6;
  border-radius: 12px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.2s ease-in-out;
  text-align: center;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardHeader = styled.h3`
  margin-bottom: 1rem;
  color: #6d8b6c;
`;

const CardImage = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Price = styled.h5`
  color: #d98655; /* tono coral/naranja suave */
  margin: 0.5rem 0;
`;

const Stock = styled.p`
  color: #999;
  font-size: 0.95rem;
`;

const AddButton = styled.button`
  margin-top: 1rem;
  background-color: #aacaa5;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #8fba87;
  }
`;
const PopMsg = styled.span`
  margin-top: 0.6rem;
  display: inline-block;
  background-color: #eaf9e9;
  color: #4caf50;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  animation: fadePop 1.5s ease-out;

  @keyframes fadePop {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    10% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;


function Item({ producto }) {
  const { id, nombre, img, precio } = producto;
  const { agregarAlCarrito } = useAppContext();
  const [ confimacion, setConfirmacion] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    setConfirmacion(true);
    setTimeout(() => setConfirmacion(false), 1500);
  }

  return (
    <Card>
      <CardLink to={`/detalle/${id}`}>
        <CardHeader>{nombre}</CardHeader>
        <CardImage src={img} alt={nombre} />
        <Price>Precio: ${precio}</Price>
        {/* <Stock>Quedan {stock} disponibles</Stock> */}
      </CardLink>
      <AddButton onClick={handleAgregar}>
        Agregar al carrito
      </AddButton>

      {confimacion && <PopMsg>✓ Agregado</PopMsg>}
    </Card>
  );
}

export default Item;
