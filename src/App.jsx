import React from 'react'
import PokemonCards from './components/PokemonCards'
import './App.css'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <PokemonCards/>
    </div>
  )
}

export default App
