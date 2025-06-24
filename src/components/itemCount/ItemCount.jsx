import styled from "styled-components";


const CounterContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 1.5rem;
`;
const ControlBox = styled.div`
display: flex;
align-items: center;
gap: 1rem;
background-color: #f7fdf8;
border: 1px solid #cce3d3;
border-radius: 12px; 
`;
const CountButton = styled.button`
background-color: #aacaa5;
color: white;
font-size: 1.2rem;
border: none;
width: 36px;
height: 36px;
cursor: pointer;
transition: background 0.2d ease;

&:hover {
    background-color: #8fba87;
}

&:disabled {
    background-color: #d8e3d7;
    cursor: not-allowed;
}
`;
const Number = styled.p`
font-size: 1.2rem;
margin: 0;
color: #4a4a4a;
width: 30px;
text-align: center;
`;
const StockNote = styled.span`
margin: 0.5rem;
font-size: 0.85rem;
color: #888;
`;

function ItemCount({ stock, contador, setContador}) {   
    
    function modificarContador(operacion){
       if (operacion === "+") {
        if (contador < stock) setContador(contador + 1);        
       } else {
           if (contador > 1) setContador(contador - 1);           
       }
    };

    return (
     <CounterContainer> 
        <ControlBox> 
            <CountButton onClick={() => modificarContador("-")}>-</CountButton>
            <Number>{contador}</Number>
            <CountButton onClick={() => modificarContador("+")}>+</CountButton>                          
        </ControlBox>
        <StockNote>Stock disponible: {stock} </StockNote>
    </CounterContainer>
    );
};            

export default ItemCount;