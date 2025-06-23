import { useParams } from "react-router-dom";
import { useAppContext } from "../context/Context";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import "./ItemListContainer.css";
import Item from "../Item/Item";



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

                <div className="paginacion">
            <button className="btn" onClick={paginaAnterior} disabled={paginaActual === 1}>Anterior</button>
            <span>Página {paginaActual} de {Math.ceil(productosFiltrados.length / productosPorPagina)} </span>
            <button className="btn" onClick={paginaSiguiente} disabled={paginaActual === Math.ceil(productosFiltrados.length / productosPorPagina)}>Siguiente</button>
            </div>
            </div>
        )
    );
}

export default ItemListContainer;