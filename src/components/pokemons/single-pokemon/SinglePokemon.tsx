import { FC, useState, useEffect } from "react";
import { SinglePokemonWrapper } from "./SinglePokemon.style";
import { fetchSinglePokemon } from "../../../api/pokemonsApi";
import { ISingleRoutPokemon } from "../../../api/pokemonsApi";

type iSinglePokemon = {
  name: string | undefined;
};

const SinglePokemon: FC<iSinglePokemon> = ({ name }) => {
  const [singlePokemonData, setSinglePokemonData] =
    useState<ISingleRoutPokemon>();

  useEffect(() => {
    fetchSinglePokemon(name).then((res) => {
      setSinglePokemonData(res);
      //   console.log(res);
    });
  }, [name]);

  return (
    <SinglePokemonWrapper>
      <section>
        <div className="single-pokemon-first-desc">
          <h2>#{singlePokemonData?.id}</h2>
          <img
            src={singlePokemonData?.sprites.other.dream_world.front_default}
            alt={singlePokemonData?.name}
          />
          <h1>{name}</h1>
        </div>
        <div className="single-pokemon-second-desc">
          <p className="xp">XP: {singlePokemonData?.base_experience}</p>
          <p className="weight">Weight: {singlePokemonData?.weight} KG</p>
          <p className="height">Height: {singlePokemonData?.height}M</p>

          {singlePokemonData?.types[1] ? (
            <p className="typee">
              Type: {singlePokemonData?.types[0].type.name} /
              {singlePokemonData?.types[1].type.name}
            </p>
          ) : (
            <p className="typee">
              Type: {singlePokemonData?.types[0].type.name}
            </p>
          )}
        </div>
      </section>
    </SinglePokemonWrapper>
  );
};

export default SinglePokemon;
