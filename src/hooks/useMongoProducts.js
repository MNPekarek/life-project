// // hooks/useMongoProducts.js
// import { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// export const useMongoProducts = (categoria, paginaActual, productosPorPagina) => {
//   const [productos, setProductos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchProductos = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/products`, {
//           params: {
//             category: categoria || "", // si no hay categoría, que devuelva todos
//             page: paginaActual,
//             limit: productosPorPagina,
//           },
//         });
//         setProductos(res.data.payload);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error al obtener productos:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductos();
//   }, [categoria, paginaActual]);

//   return { productos, loading, totalPages };
// };

import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const buildQueryParams = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value != null && value !== "") {
  params.append(key, value);
}
  });
  return params.toString();
};

export const useMongoProducts = ({ 
  category,
  page = 1,
  limit = 16,
  search,
  minPrice,
  maxPrice,
  sortBy,
  order = "asc",
 }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const filters = {
          category,
          page,
          limit,
          search,
          minPrice,
          maxPrice,
          sortBy,
          order,
        };
        const query = buildQueryParams(filters);
        const response = await axios.get(`${API_URL}/api/products?${query}`);
        setProducts(response.data.payload);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  },  [category, page, limit, search, minPrice, maxPrice, sortBy, order] ); // Deep compare to trigger on filter changes

  return { products, totalPages, loading, error };
};