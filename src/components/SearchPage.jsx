import React, { useState } from 'react';
import ListingPage from './ListingPage';

const SearchPage = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        setError('Error retrieving Pokémon data. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Search Pokemon</h2>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>
      <button style={{marginLeft: "20px"}}>
        <a style={{color: "#fff"}} href="/bookmarks">Bookmarks</a>
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
      <ListingPage />
    </div>
  );
};

export default SearchPage;