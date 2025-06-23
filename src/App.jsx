
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ContextProvider } from './components/context/Context'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import PropagandaCarousel from './components/carrusel/carrusel'
import Navbar from './components/navbar/Navbar'

function App() {
 

  return (
    <ContextProvider>
      <Navbar />
      <PropagandaCarousel />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ItemListContainer />} />     
           
        </Routes>      

      </BrowserRouter>      
    </ContextProvider>
  )
}

export default App
