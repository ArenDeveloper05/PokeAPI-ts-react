import { FC } from "react";
import { Link } from "react-router-dom";
import { PokemonsListItemWrapper } from "./PokemonsList.styled";

type PokemonsListItemProps = {
  name: string;
  url: string;
  id: number;
  type: string;
  // type: keyof typeof colors;
};

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
} as any;

const PokemonsListItem: FC<PokemonsListItemProps> = ({
  name,
  url,
  id,
  type,
}) => {
  return (
    <PokemonsListItemWrapper style={{ backgroundColor: `${colors[type]}` }}>
      <h1>#{id}</h1>
      <img src={url} alt="Pokemon" />
      <Link to={`/pokemons/${name}`}>
        <p title={name}>{name}</p>
      </Link>

      <span>{type}</span>
    </PokemonsListItemWrapper>
  );
};

export default PokemonsListItem;
