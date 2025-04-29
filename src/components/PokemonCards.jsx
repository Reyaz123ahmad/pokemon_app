
import './PokemonCards.css'

import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonCards = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      const detailedPokemonData = await Promise.all(
        result.results.map(async (pokemon) => {
          try {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
            return await pokemonResponse.json();
          } catch (err) {
            console.error(`Error fetching ${pokemon.name}:`, err);
            return null;
          }
        })
      );
      
      const validPokemon = detailedPokemonData.filter(pokemon => pokemon !== null);
      setPokemonData(validPokemon);
      setFilteredData(validPokemon);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let results = pokemonData;
    
    // Apply name filter
    if (searchTerm) {
      results = results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      results = results.filter(pokemon => 
        pokemon.types.some(type => type.type.name === typeFilter)
      );
    }
    
    setFilteredData(results);
  }, [searchTerm, typeFilter, pokemonData]);

  // Get unique types for filter dropdown
  const allTypes = [...new Set(pokemonData.flatMap(pokemon => 
    pokemon.types.map(type => type.type.name)))].sort();

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button className='try-again-btn' onClick={fetchData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="pokemon">
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        
          <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="type-filter"
          >
          <option value="all" >All Types</option>
          {allTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
         </select>
        
      </div>

      {filteredData.length === 0 ? (
        <div className="empty-state">
          <p>No Pokémon found matching your search</p>
          <button className='reset-btn'
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('all');
              
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="pokemon-cards">
          {filteredData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonCards;