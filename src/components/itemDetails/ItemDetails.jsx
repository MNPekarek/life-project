import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/Context";
import Loader from "../loader/Loader";
import ItemCount from "../itemCount/ItemCount";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DetailContaiener = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: "Poppins", sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const ImageBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #f1f8f4;
  border-radius: 12px;
  padding: 1rem;
`;
const ProductImg = styled.img`
  max-width: 100%;
  border-radius: 10px;
  object-fit: cover;
`;
const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Title = styled.h3`
  color: #3d6b47;
`;
const Price = styled.h4`
  color: #4caf50;
  font-size: 1.2rem;
`;
const AddButton = styled.button`
  margin-top: 1rem;
  background: #4caf50;
  color: white;
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

const CantidadBox = styled.div`
  display: flex;
`;

const CantidadButton = styled.button`
  margin-left: 0.5rem;
  color: white;
  background-color: #67a66a;
  border: none;
  border-radius: 10px;
  padding: 0.2rem;
`;

function ItemDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState(null);
  const [contador, setContador] = useState(1);

  const { productos, agregarAlCarrito } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (productos.length > 0) {
      const productosAMostrar = productos.find((el) => el.id === parseInt(id));
      setProducto(productosAMostrar);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [productos, id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!producto) {
    return <p>Producto no encontrado en el id {id} </p>;
  }

  const { nombre, img, precio, categoria, descripcion, stock } = producto;

  
  const nameProduc = nombre;
  const productosXNombre = productos.filter(
    (prod) => prod.nombre === nameProduc
  );


  return (
    <DetailContaiener>
      <ImageBox>
        <ProductImg src={img} alt={nombre} />
      </ImageBox>
      <InfoBox>
        <Title>{nombre} </Title>
        <Price>${precio} </Price>
        <h5>Categoria: {categoria} </h5>
        {/* <p>Quedan {stock} </p> */}
        <p>{descripcion} </p>
        <CantidadBox>
          <p>Cantidad: </p>
          {productosXNombre.map((prod) => (
            <CantidadButton
              key={prod.id}
              onClick={() => navigate(`/detalle/${prod.id} `)}
              style={{
                backgroundColor:
                  prod.id === producto.id ? "#4caf50" : "#67a66a",
                fontWeight: prod.id === producto.id ? "bold" : "normal",
                border: prod.id === producto.id ? "2px solid white" : "none",
              }}
            > 
              {prod.cantidad}
            </CantidadButton>
          ))}
        </CantidadBox>
        <ItemCount
          stock={stock}
          contador={contador}
          setContador={setContador}
        />
        <AddButton onClick={() => agregarAlCarrito(producto, contador)}>
          Agregar al carrito{" "}
        </AddButton>
      </InfoBox>
    </DetailContaiener>
  );
}

export default ItemDetail;
