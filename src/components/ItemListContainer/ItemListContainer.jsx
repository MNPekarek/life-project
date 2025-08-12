import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../loader/Loader";
import Item from "../Item/Item";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMongoProducts } from "../../hooks/useMongoProducts";
import SearchBar from "../search/Search";

function ItemListContainer({
  search,
  page,
  limit,
  onPageChange,
  title = "Catálogo",
}) {
  const [paginaActual, setPaginaActual] = useState(page || 1);
  const pagina = page || paginaActual;

  const { categoria } = useParams();
  const categoriaNormalizada = categoria?.toLowerCase().trim();

  const { products, loading, totalPages } = useMongoProducts({
    category: categoriaNormalizada,
    search,
    page: paginaActual,
    limit,
  });

  // const productosPorPagina = 16;

  const cambiarPagina = (nuevaPagina) => {
    if (onPageChange) {
      onPageChange(nuevaPagina);
    } else {
      setPaginaActual(nuevaPagina);
    }
  };

  const paginaSiguiente = () => {
    if (pagina < totalPages) cambiarPagina(pagina + 1);
  };
  const paginaAnterior = () => {
    if (pagina > 1) cambiarPagina(pagina - 1);
  };

  if (loading) {
    return (
      <CatalogWrapper>
        <Loader />
      </CatalogWrapper>
    );
  }

  return (
    <div>
      <SearchBar />
      <CatalogWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </Title>

        {Array.isArray(products) && products.length > 0 ? (
          <GridContainer>
            {products.map((el) => (
              <Item key={el._id} producto={el} />
            ))}
          </GridContainer>
        ) : (
          <Message>No hay productos en esta categoría 🧺</Message>
        )}

        <Paginacion>
          <Boton onClick={paginaAnterior} disabled={paginaActual === 1}>
            Anterior
          </Boton>
          <PaginaTexto>
            Página {pagina} de {totalPages}
          </PaginaTexto>
          <Boton
            onClick={paginaSiguiente}
            disabled={paginaActual === totalPages}
          >
            Siguiente
          </Boton>
        </Paginacion>
      </CatalogWrapper>
    </div>
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
  background: ${({ disabled }) => (disabled ? "#e5e7eb" : "#397c43")};
  color: ${({ disabled }) => (disabled ? "#9ca3af" : "white")};
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#e5e7eb" : "#397c43")};
  }
`;

const PaginaTexto = styled.span`
  font-size: 1rem;
  color: #374151;
`;

const Title = styled(motion.h2)`
  padding-left: 1rem;
  font-size: 2rem;
  color: #3a5a40;
  font-weight: 700;
  letter-spacing: 0.04rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 80%;
    height: 2px;
    background-color: #3a5a40;
    transform-origin: center;
    transition: transform 0.4s ease;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

const CatalogWrapper = styled.div`
  padding: 0.5rem 1rem;
  background-color: #fdfdfd;
  min-height: 100vh;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  justify-content: center;
`;
const Message = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 1.1rem;
  margin-top: 2rem;
`;
