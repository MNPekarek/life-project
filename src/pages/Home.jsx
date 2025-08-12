import PropagandaCarousel from "../components/carrusel/carrusel";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
// import NewProducts from "../components/newProduct/NewProducts";
// import SearchBar from "../components/search/Search";



function Home()  {
    

    return(
        <>
        <PropagandaCarousel />
        {/* <SearchBar  /> */}
        {/* <NewProducts /> */}
        <ItemListContainer />        
        </>
    )
}
export default Home;