import { useParams } from "react-router-dom";
import SinglePokemon from "../components/pokemons/single-pokemon/SinglePokemon";

const PokemonPage = () => {
  const { name } = useParams();

  return <SinglePokemon name={name} />;
};

export default PokemonPage;
