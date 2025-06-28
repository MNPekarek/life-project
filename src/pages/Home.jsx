import PropagandaCarousel from "../components/carrusel/carrusel";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import SearchBar from "../components/search/Search";



function Home()  {
    

    return(
        <>
        <PropagandaCarousel />
        <SearchBar  />
        <ItemListContainer />        
        </>
    )
}
export default Home;