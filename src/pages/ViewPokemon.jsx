import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ViewPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        );
        const result = await response.json();
        setPokemon(result.pokemon.find(pokemon => pokemon.id === id));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    getPokemon();
  }, [id]);

  return (
    <div className="bg">
      <h1>Hello</h1>
    </div>
  );
};

export default ViewPokemon;
