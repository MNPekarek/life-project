import styled from "styled-components";
import Item from "../Item/Item";


import { useAppContext } from "../context/Context";

const Section = styled.section`
padding: 2rem;
background: #fff; 
`;
const Title = styled.h2`
font-size: 1.8rem;
margin-bottom: 1rem;
`;
const ScrollContainer = styled.div`
display: flex;
overflow-x: auto;
scroll-snap-type: x mandatory;
gap: 1rem;
padding-bottom: 1rem;

&::-webkit-scrollbar {
    display: none;
}
`;
const ProductCard = styled.div`
flex: 0 0 auto;
scroll-snap-align: start;
background: #f9f9f9;
padding: 1rem;
border-radius: 12px;
width: 220px;
box-shadow: 0 4px 8px rgba(0,0,0,0.05);
`;


export default function NewProducts() {

    const {productos} = useAppContext();
    const nuevos = productos.filter(prod => prod.new);


    return(
        <Section>
            <Title>Nuevos Productos</Title>
            <ScrollContainer>
                {nuevos.map((el) => (
                    <Item key={el.id} producto={el} />
                //     <ProductCard key={idx}>
                //     <h4>{prod.nombre} </h4>
                //     <p>${prod.precio} </p>
                // </ProductCard>
                )
            )}
            </ScrollContainer>
        </Section>
    )
}
