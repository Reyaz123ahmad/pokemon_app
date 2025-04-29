import React from 'react'
import PokemonCards from './components/PokemonCards'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <PokemonCards/>
      <Footer/>
    </div>
  )
}

export default App
