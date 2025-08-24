import styled from "styled-components";
import { useAppContext } from "../context/Context";
import { Link } from "react-router-dom";


const CartContainer = styled.div`
padding: 2rem;
max-width: 900px;
margin: 0 auto;
background: #f7fdf8;
border-radius: 12px;
box-shadow: 0 2px 12px rgba(100, 150, 100, 0.1);
font-family: 'Poppins', sans-serif;
`;
const ProductCard = styled.div`
display: flex;
gap: 1rem;
padding: 1.2rem;
margin-bottom: 1.5rem;
border: 1px solid #d3e6d2;
border-radius: 10px;
background-color: #ffffff;
`;
const ProductoImage = styled.img`
width: 90px;
height: 90px;
object-fit: cover;
border-radius: 8px;
`;
const ProductDetails = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;
`;
const Title = styled.h2`
color: #3d6b47;
margin-bottom: 2rem;
text-align: center;
`;
const Text = styled.p`
color: #444;
margin: 0.3rem 0;
`;
const DeleteButton = styled.button`
background: none;
border: none;
color: #d94444;
cursor: pointer;
transition: transform 0.2s ease;

&:hover {
  transform: scale(1.2);
}
`;
const TotalBox = styled.div`
margin-top: 2rem;
padding: 1rem;
border-top: 2px solid #c2e2c5;
display: flex;
justify-content: space-between;
align-items: center;
`;
const FinalButton = styled(Link)`
background: linear-gradient(to right, #8edaa0, #70c68d);
color: white;
padding: 0.8rem 1.6rem;
border-radius: 10px;
text-decoration: none;
font-weight: 600;
transition: background 0.3s ease;

&:hover {
  background: linear-gradient(to right, #74cf91, #5ab97b)
}
`;

function Cart() {
  const { carrito, setCarrito } = useAppContext();

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((producto) => producto._id !== id));
  };

  const totalFinal = carrito.reduce(
    (acc, el) => acc + el.price * el.cantidadCart,
    0
  );

  return (
    <CartContainer>
      <Title>🛒 Tu carrito saludable</Title>
      {carrito.length === 0 ? (
        <Text>🌿 El carrito está vacío por ahora</Text>
      ) : (
        carrito.map((producto) => (
          <ProductCard key={producto._id}>
            <ProductoImage src={producto.thumbnail} alt={producto.title} />
            <ProductDetails>
              <h3>{producto.title} {producto.quantity}</h3>
              <Text>Precio: ${producto.price}</Text>
              <Text>Cantidad: {producto.cantidadCart}</Text>
              <Text>Total: ${producto.price * producto.cantidadCart}</Text>
              <DeleteButton onClick={() => eliminarProducto(producto._id)}>
                ❌
              </DeleteButton>
            </ProductDetails>
          </ProductCard>
        ))
      )}
      <TotalBox>
        <h3>Total: ${totalFinal}</h3>
        {carrito.length > 0 && (
          <FinalButton to="/ordenes">Finalizar Compra</FinalButton>          
        )}
      </TotalBox>
    </CartContainer>
  );
}

export default Cart;
