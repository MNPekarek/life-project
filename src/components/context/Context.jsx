import { useContext, useState } from "react";
import { createContext } from "react";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

const AppContext =createContext();

export const useAppContext = () => useContext(AppContext);
export const ContextProvider = ({children}) => {

    // const [productos, setProductos ] = useState([]);
    const [carrito, setCarrito] = useState([]);
    // const [searchQuery, setSearchQuery] = useState("");

    const clearCart = () => setCarrito([]);

    // useEffect(() => {
    //     const productosCollection = collection(db, "productos");

    //     getDocs(productosCollection)
    //     .then(snapshot => {
    //         let arrayDeProductos = snapshot.docs.map(el => ({
    //             id: el.id,
    //             ...el.data()
    //         }));
    //         setProductos(arrayDeProductos);
    //     })
    //     .catch(err => console.error("Error al obtener los productos:", err))
    // }, [])

    function agregarAlCarrito(prod, cantidadCart) {
        if (!cantidadCart || isNaN(cantidadCart)) {
            cantidadCart = 1;
        } 

        const nuevoProducto = { ...prod, cantidadCart };

        

        if (carrito.some(el => el._id === prod._id)) {
            const newCarrito = carrito.map(element => element._id === prod._id ? { ...element, cantidadCart: element.cantidadCart + cantidadCart} : element );
            setCarrito(newCarrito);
        } else {
            setCarrito([...carrito, nuevoProducto]);
        }

        setTimeout(() => {
            
        }, 1000)
    }

    return (
        <AppContext.Provider value={{  carrito, setCarrito, agregarAlCarrito, clearCart }}>
            {children}
        </AppContext.Provider> 
    )
}