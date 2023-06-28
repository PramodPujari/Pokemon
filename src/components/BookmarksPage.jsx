import React, { useState, useEffect } from 'react';

const BookmarksPage = () => {
  
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const bookmarkedPokemonArray = keys.map((element) => ({
      name: element,
      image: localStorage.getItem(element),
    }));
    console.log(bookmarkedPokemonArray);
    setBookmarkedPokemon(bookmarkedPokemonArray);
  }, [refresh]);

  const handleRemoveBookmark = (pokemonName) => {
    localStorage.removeItem(pokemonName);
    setRefresh(!refresh);
  };


  return (
    <div>
      <h2>Bookmarked Pokemons</h2>
      <div className="pokemon-grid">
        {
          bookmarkedPokemon.map((pokemon) => (
            <div key={pokemon.name}>
              <h3>{pokemon.name.toUpperCase()}</h3>
              <img src={pokemon.image} alt="" />
              <button onClick={() => handleRemoveBookmark(pokemon.name)}>
                Remove Bookmark
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default BookmarksPage;