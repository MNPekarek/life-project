import styled from "styled-components";
import { useAppContext } from "../components/context/Context";
import Fuse from "fuse.js";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import Item from "../components/Item/Item";



const PageWrapper = styled.div`
padding: 2rem;`;
const ResultGrid = styled.div`
display: grid;
gap: 1rem;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;


const SearchPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryFromURL = searchParams.get("q") || "";

    const {productos, setSearchQuery } = useAppContext();

    useEffect(() => {
        setSearchQuery(queryFromURL);
    }, [queryFromURL, setSearchQuery]);

    const fuse = useMemo(
        () =>
            new Fuse(productos, {
                keys: ["nombre", "categoria", "descripcion"],
                threshold: 0.4,
            }),
            [productos]
        ); 

    const resultados = queryFromURL
    ? fuse.search(queryFromURL).map((r) => r.item)
    : [];

    return(
        <PageWrapper>
            <h2>Resultados para: "{queryFromURL}" </h2>
            {resultados.length > 0 ? (
                <ResultGrid>
                    {resultados.map((prod) => (
                        <Item key={prod.id} producto={prod} />
                        // <Card key={prod.id}>
                        //     <h4>{prod.nombre} </h4>
                        //     <p>{prod.descripcion} </p>
                        // </Card>
                    ))}
                </ResultGrid>
            ) : (
                <p>No se encontraron productos para "{queryFromURL} " </p>
            )}
        </PageWrapper>
    );
};

export default SearchPage;