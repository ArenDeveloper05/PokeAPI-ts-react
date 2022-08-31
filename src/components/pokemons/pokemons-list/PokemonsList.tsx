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
  const [loadMore, setLoadMore] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [allPokemons, setAllPokemons] = useState<IPokemon[]>([]);
  const [err, setErr] = useState<Error>();

  const getAllPokemonsData = useCallback((loadMore: string | null) => {
    setLoading(true);
    fetchPokemons(loadMore)
      .then((res) => {
        setLoadMore(res.next);

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
    getAllPokemonsData(loadMore);
  }, [getAllPokemonsData]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <PokemonsListWrapper>
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
          <button
            className="load-more"
            onClick={() => getAllPokemonsData(loadMore)}
          >
            Load More
          </button>
        </>
      )}
    </PokemonsListWrapper>
  );
};

export default memo(PokemonsList);
