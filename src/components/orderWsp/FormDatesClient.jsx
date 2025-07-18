import styled from "styled-components";
import { useAppContext } from "../context/Context";
import { useState } from "react";
import { generateWhatsAppMessage } from "./OrderWsp";

const FormContainer = styled.div`
background: #f5f5f5;
padding: 1.5rem;
border-radius: 12px;
max-width: 400px;
margin: auto;
box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;
const Input = styled.input`
width: 100%;
padding: 0.7rem;
margin-top: 0.8rem;
border: 1px solid #ccc;
border-radius: 8px;
font-size: 1rem;
`;
const Button = styled.a`
display: inline-block;
margin-top: 1.2rem;
padding: 0.75rem 1.2rem;
background-color: #25d366;
color: white;
text-decoration: none;
font-weight: bold;
border-radius: 8px;
transition: background 0.3s ease;
text-align: center;

&:hover {
    background-color: #1ebc59;
}
`;

function FormDatesClient() {
  const { carrito, clearCart } = useAppContext();
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [addressClient, setAddressClient] = useState("");

  const phoneNumber = "5493513419548";
  const message = generateWhatsAppMessage(carrito, name, addressClient, neighborhood);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <FormContainer>
      <h3>Completá tu pedido</h3>
      <Input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Tu dirección"
        value={addressClient}
        onChange={(e) => setAddressClient(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Tu barrio"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
      />
      <Button as="button"
      onClick={() => {
        window.open(whatsappUrl, "_blank");
        clearCart();
      }}
      >
        Enviar pedido por WhatsApp
      </Button>
    </FormContainer>
  );
}

export default FormDatesClient;