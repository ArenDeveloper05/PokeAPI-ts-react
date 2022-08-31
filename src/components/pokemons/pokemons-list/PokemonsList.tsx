import { memo, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  fetchPokemons,
  fetchPokemon,
  IPokemon,
} from "../../../api/pokemonsApi";
import Loader from "../../loader/Loader";
import { PokemonsListWrapper } from "./PokemonsList.styled";
import PokemonsListItem from "./PokemonsListItem";

const PokemonsList = () => {
  const { ref: bottomRef, inView } = useInView({
    threshold: 1,
    rootMargin: "100px",
  });

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

  const handleLoadMore = useCallback(() => {
    setOffset((prev) => prev + 20);
  }, []);

  useEffect(() => {
    getAllPokemonsData(offset);
  }, [getAllPokemonsData, offset]);

  useEffect(() => {
    console.log(inView);
    if (inView) {
      handleLoadMore();
    }
  }, [inView, handleLoadMore]);

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
            {allPokemons?.map((pokemon) => (
              <PokemonsListItem
                key={pokemon.id}
                name={pokemon.name}
                url={pokemon.sprites.other.dream_world.front_default}
                id={pokemon.id}
                type={pokemon.types[0].type.name}
              />
            ))}
          </div>
          {allPokemons.length !== 0 && (
            <div ref={bottomRef} style={{ width: "100%", height: "1px" }} />
          )}
          {loading && <Loader />}
          {/* <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button> */}
        </>
      )}
    </PokemonsListWrapper>
  );
};

export default memo(PokemonsList);
