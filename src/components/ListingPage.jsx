import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemonList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(currentPage - 1) * 10}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonList((prevList) => [...prevList, ...data.results]);
      } else {
        setError('Error retrieving Pokémon list. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>All Pokemons</h2>
      <div className="pokemon-grid">
        {
          pokemonList.map((pokemon) => (
            <div key={pokemon.name} className='card'>
              <h3>{pokemon.name.toUpperCase()}</h3>
              <Link to={`/details/${pokemon.name}`}>
                <p>{"Details"}</p>
              </Link>
            </div>
          ))
        }
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={handleLoadMore} disabled={loading}>
        Load More
      </button>
    </div>
  );
};

export default ListingPage;