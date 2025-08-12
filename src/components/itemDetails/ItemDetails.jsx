import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/Context";
import Loader from "../loader/Loader";
import ItemCount from "../itemCount/ItemCount";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState(null);
  const [contador, setContador] = useState(1);

  const { agregarAlCarrito } = useAppContext();

  const [variantes, setVariantes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProducto(res.data.payload);
      } catch (err) {
        console.log("Error al obtener el producto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  useEffect(() => {
    if (producto?.title) {
      axios(`${API_URL}/api/products/variants/${encodeURIComponent(producto.title)}`)
        .then((res) => setVariantes(res.data.payload))
        .catch((err) => console.error("Error al obtener variantes", err));
    }
  }, [producto]);

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

  const { title, thumbnail, price, category, description, stock } = producto;

  // const nameProduc = title;
  // const productosXNombre = productos.filter(
  //   (prod) => prod.nombre === nameProduc
  // );

  return (
    <DetailContaiener>
      <ImageBox>
        <ProductImg src={thumbnail} alt={title} />
      </ImageBox>
      <InfoBox>
        <Title>{title} </Title>
        <Price>${price} </Price>
        <h5>Categoria: {category} </h5>
        {/* <p>Quedan {stock} </p> */}
        <p>{description} </p>
        <CantidadBox>
          <p>Cantidad: </p>
          {variantes.map((prod) => (
            <CantidadButton
              key={prod._id}
              onClick={() => navigate(`/detalle/${prod._id}`)}
              style={{
                backgroundColor:
                  prod._id === producto._id ? "#4caf50" : "#67a66a",
                fontWeight: prod._id === producto._id ? "bold" : "normal",
                border: prod._id === producto._id ? "2px solid white" : "none",
              }}
            >
              {prod.quantity}
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
