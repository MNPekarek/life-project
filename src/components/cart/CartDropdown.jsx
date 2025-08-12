import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Context"
import styled from "styled-components";

const Dropdown = styled.div`
position: absolute;
right: 1rem;
top: 4.5rem;
width: 300px;
max-height: 60vh;
overflow-y: auto;
background-color: #f9f9f9;
border: 1px solid #ddd;
border-radius: 12px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
padding: 1rem;
z-index: 10;
color: #333;    

/* @media (max-width: 400px) {
    right: 50%;
    transform: translateX(50%);
    width: 90vw;
} */

 &::-webkit-scrollbar {
    width: 6px;
 }
 &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 6px;
 }
`;
const Product = styled.div`
padding: 0.5rem;
border-bottom: 1px solid #eee;
font-size: 0.95rem;    
`;
const Total = styled.h4`
margin-top: 1rem;
color: #4caf50;    
`;
const Button = styled.button`
width: 100%;
margin-top: 0.8rem;
padding: 0.6rem;
background-color: #4caf50;
color: white;
border: none;
border-radius: 10px;
font-weight: 600;
cursor: pointer;

&:hover {
    background-color: #45a049;
}
`;

function CartDropdown() {
    const {carrito} = useAppContext();
    const navigate = useNavigate();

    return (
        <Dropdown>
            <h3>Carrito</h3>
            {carrito.length === 0 ? (
                <p>Vacío</p>
            ) : (
                carrito.map((producto) => (
                    <Product key={producto._id}>
                        <p>{producto.title} {producto.cantidad} - {producto.cantidadCart} ${producto.price * producto.cantidadCart}</p>
                    </Product>
                ))
            )}
            <Total>
                Total: ${carrito.reduce((acc, el) => acc + el.price * el.cantidadCart, 0)}
            </Total>
            <Button onClick={() => navigate("/carrito")}>Ver carrito</Button>
        </Dropdown>
    )
}

export default CartDropdown;