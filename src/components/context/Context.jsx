import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AppContext =createContext();

export const useAppContext = () => useContext(AppContext);
export const ContextProvider = ({children}) => {

    const [productos, setProductos ] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const productosCollection = collection(db, "productos");

        getDocs(productosCollection)
        .then(snapshot => {
            let arrayDeProductos = snapshot.docs.map(el => ({
                id: el.id,
                ...el.data()
            }));
            setProductos(arrayDeProductos);
        })
        .catch(err => console.error("Error al obtener los productos:", err))
    }, [])

    function agregarAlCarrito(prod, cantidad) {
        if (!cantidad || isNaN(cantidad)) {
            cantidad = 1;
        } 

        const nuevoProducto = { ...prod, cantidad };

        console.log("Producto antes de agregar al carrito:", nuevoProducto);

        if (carrito.some(el => el.id === prod.id)) {
            const newCarrito = carrito.map(element => element.id === prod.id ? { ...element, cantidad: element.cantidad + cantidad} : element );
            setCarrito(newCarrito);
        } else {
            setCarrito([...carrito, nuevoProducto]);
        }

        setTimeout(() => {
            console.log("Carrito actualizado:", carrito);
        }, 1000)
    }

    return (
        <AppContext.Provider value={{ productos, carrito, setCarrito, agregarAlCarrito }}>
            {children}
        </AppContext.Provider> 
    )
}