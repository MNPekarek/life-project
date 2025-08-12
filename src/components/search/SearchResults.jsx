import { useSearchParams } from "react-router-dom";
import { useMongoProducts } from "../../hooks/useMongoProducts";

function SearchResults() {
  const [params] = useSearchParams();
  const search = params.get("q");

  const { products, loading } = useMongoProducts({ search });

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Resultados para: "{search}"</h2>
      {products.length > 0 ? (
        products.map((p) => <Item key={p._id} producto={p} />)
      ) : (
        <p>No se encontraron productos 🕵️‍♂️</p>
      )}
    </div>
  );
}