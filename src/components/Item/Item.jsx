import { Link } from "react-router";
import styled from "styled-components";

 const CardLink = styled(Link)`
  text-decoration:none;
  color: inherit;`;

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

function Item({ producto }) {
  const { id, nombre, img, precio } = producto;

 

  return (
    <CardLink to={`/detalle/${id}`}>
        <Card>
            <CardHeader>{nombre}</CardHeader>
            <CardImage src={img} alt={nombre} />
            <Price>Precio: ${precio}</Price>
            {/* <Stock>Quedan {stock} disponibles</Stock> */}
            <AddButton>Agregar al carrito</AddButton>
        </Card>
    </CardLink>
  );
}

export default Item;
