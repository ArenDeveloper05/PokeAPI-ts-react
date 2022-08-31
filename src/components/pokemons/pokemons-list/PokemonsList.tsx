import { memo, useCallback, useEffect, useState } from "react";
import {
  fetchPokemons,
  fetchPokemon,
  IPokemon,
} from "../../../api/pokemonsApi";
import PageLoader from "../../page-loader/PageLoader";
import { PokemonsListWrapper } from "./PokemonsList.styled";
import PokemonsListItem from "./PokemonsListItem";

const PokemonsList = () => {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState<IPokemon[]>([]);
  const [err, setErr] = useState<Error>();

  const getAllPokemonsData = useCallback((offset: number) => {
    setLoading(true);

    fetchPokemons(offset)
      .then((res) => {
        for (let i = 0; i < res.results.length; i++) {
          const element = res.results[i];
          fetchPokemon(element.name).then((pokemon) => {
            setAllPokemons((prev) => [
              ...prev,
              {
                name: pokemon.name,
                sprites: pokemon.sprites,
                id: pokemon.id,
                types: pokemon.types,
              },
            ]);
          });
        }
      })
      .catch((err) => setErr(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("allPokemons", allPokemons);
  }, [allPokemons]);

  const handleLoadMore = useCallback(() => {
    setOffset((prev) => prev + 20);
  }, []);

  useEffect(() => {
    console.log("offset", offset);
    getAllPokemonsData(offset);
  }, [getAllPokemonsData, offset]);

  return (
    <PokemonsListWrapper>
      {loading && <PageLoader />}
      {err ? (
        <div
          style={{ color: "red", display: "flex", justifyContent: "center" }}
        >
          {err.message}
        </div>
      ) : (
        <>
          <h1>POKEMONS</h1>
          <div className="pokemons">
            {allPokemons?.map((pokemon, idx) => (
              <PokemonsListItem
                key={pokemon.id}
                name={pokemon.name}
                url={pokemon.sprites.other.dream_world.front_default}
                id={pokemon.id}
                type={pokemon.types[0].type.name}
              />
            ))}
          </div>
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        </>
      )}
    </PokemonsListWrapper>
  );
};

export default memo(PokemonsList);
