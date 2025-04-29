import React from 'react';
import './PokemonCard.css';


const PokemonCard = ({ pokemon }) => {
  // Add defensive checks
  if (!pokemon) return null;
  
  return (
    <div className="pokemon-card">
      <h3>{pokemon.id}.</h3>
      <div className='pokemon-content'>
        <h3>{pokemon.name || 'Unknown Pokémon'}</h3>
        
        <img 
          src={pokemon.sprites?.front_default} 
          alt=''
          className='pokemon-image'
        />
        <div className="types">
          {pokemon.types?.map((type, index) => (
            <span key={index} className='pokemon-type'>
              {type.type.name}
            
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PokemonCard;