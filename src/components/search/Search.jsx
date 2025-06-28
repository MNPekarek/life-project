// SearchBar.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Fuse from "fuse.js"; // fuzzy search
import { useAppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 1rem auto;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Suggestions = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 6px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 0.6rem 1rem;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const SearchBar = () => {
  const {productos, setSearchQuery} = useAppContext()
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Configuración para fuzzy search
  const fuse = new Fuse(productos, {
    keys: ["nombre", "categoria", "descripcion"], // personalizá estas keys según tu modelo
    threshold: 0.4, // sensibilidad
  });

  useEffect(() => {
    if (query.length === 0) return setSuggestions([]);

    const resultados = fuse.search(query).map((res) => res.item);
    setSuggestions(resultados.slice(0, 5)); // Mostramos hasta 5 sugerencias
  }, [query]);

  const handleSelect = (producto) => {
    const nombre = producto.nombre;
    setQuery(nombre);
    setSuggestions([]);
    setSearchQuery(nombre); // Lógica para manejar el producto seleccionado
    navigate(`/search?q=${encodeURIComponent(nombre)}`);
};

const handleSubmit = () => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return;
  setSuggestions([]);
  setSearchQuery(trimmedQuery);
  navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
};

  return (
    <SearchWrapper>
      <Input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim() !== "") {
            handleSubmit();
          }
        }}
      />
      {suggestions.length > 0 && (
        <Suggestions>
          {suggestions.map((item, idx) => (
            <SuggestionItem key={idx} onClick={() => handleSelect(item)}>
              {item.nombre}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
    </SearchWrapper>
  );
};

export default SearchBar;