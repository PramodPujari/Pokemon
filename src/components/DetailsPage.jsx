import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPage.css';

const DetailsPage = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchPokemonData = async () => {
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

  useEffect(() => {
    if (localStorage.getItem(pokemonName)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
    fetchPokemonData();
  }, [pokemonName]);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prevValue) => !prevValue);
    if (!isBookmarked) {
      localStorage.setItem(pokemonName, pokemonData.sprites.front_default)
    } else {
      localStorage.removeItem(pokemonName);
    }
    // Code to handle bookmarking and unbookmarking the Pokémon
  };

  return (
    <div className="container">
      <h2>{pokemonName.toUpperCase()} Details</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {pokemonData && (
        <div className="pokemon-details">
          <h3 className="pokemon-name">{pokemonData.name.toUpperCase()}</h3>
          <img className="pokemon-image" src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          {/* Display other details as per your requirement */}
          <button
              className={`button ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmarkToggle}
              disabled={loading}
            >
              {isBookmarked ? (
                <>
                  <span className="bookmark-icon">🔖</span>
                  <span className="bookmark-text">Remove Bookmark</span>
                </>
              ) : (
                <>
                  <span className="bookmark-icon">🔖</span>
                  <span className="bookmark-text">Bookmark</span>
                </>
              )}
            </button>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;