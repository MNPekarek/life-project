import { useParams } from "react-router-dom";
import { useAppContext } from "../context/Context";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import "./ItemListContainer.css";
import Item from "../Item/Item";
import styled from "styled-components";



function ItemListContainer() {
    const { categoria } = useParams();
    const { productos } = useAppContext();
    
    const [loading, setLoading] = useState(true);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [paginaActual, setPAginaActual] = useState(1);
    const productosPorPagina = 6;

    useEffect(() => {
        if (productos.length > 0) {
            const filtrados = categoria
            ? productos.filter(el => el.categoria === categoria)
            : productos;
            setProductosFiltrados(filtrados);
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }, [productos, categoria])

    const indiceInicial = (paginaActual -1) * productosPorPagina;
    const indiceFinal = indiceInicial + productosPorPagina;
    const productosEnPagina = productosFiltrados.slice(indiceInicial, indiceFinal);

    const paginaSiguiente = () => {
        if (paginaActual < Math.ceil(productosFiltrados.length / productosPorPagina)) {
            setPAginaActual(paginaActual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPAginaActual(paginaActual - 1);
        }
    };

    return (
        loading ? (
            <div className="loaderContainer">
                <Loader />                
            </div>
        ) : (
            <div>
                <div className="container-productos">
                    {productosEnPagina.length > 0 ? (
                        productosEnPagina.map(el => (
                            <Item key={el.id} producto={el} />
                        ))
                    ) : (
                        <p>No hay productos en esta categoría</p>
                    )}
                </div>

                <Paginacion>
  <Boton onClick={paginaAnterior} disabled={paginaActual === 1}>Anterior</Boton>
  <PaginaTexto>Página {paginaActual} de {Math.ceil(productosFiltrados.length / productosPorPagina)}</PaginaTexto>
  <Boton onClick={paginaSiguiente} disabled={paginaActual === Math.ceil(productosFiltrados.length / productosPorPagina)}>Siguiente</Boton>
</Paginacion>
            </div>
        )
    );
}

export default ItemListContainer;

const Paginacion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Boton = styled.button`
  background: ${({ disabled }) => (disabled ? '#e5e7eb' : '#397c43')};
  color: ${({ disabled }) => (disabled ? '#9ca3af' : 'white')};
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#e5e7eb' : '#397c43')};
  }
`;

const PaginaTexto = styled.span`
  font-size: 1rem;
  color: #374151;
`;
