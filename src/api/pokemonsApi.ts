import { api } from "../lib/axios";

export type IPokemonsList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IAllPokemons[];
};

export type IAllPokemons = {
  name: string;
  url: string;
};

export type IPokemon = {
  name: string;
  id: number;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
};
export type ISingleRoutPokemon = {
  name: string;
  id: number;
  base_experience: number;
  weight: number;
  height: number;
  types: [
    {
      type: {
        name: string;
      };
    },
    {
      type: {
        name: string;
      };
    }
  ];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
};

export const fetchPokemons = async (url: any) => {
  try {
    const { data } = await api.get<IPokemonsList>(url);
    console.log(data);

    return data;
  } catch (e) {
    throw new Error("Oop's something went wrong");
  }
};

export const fetchPokemon = async (name: any) => {
  try {
    const { data } = await api.get<IPokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    // console.log(data);

    return data;
  } catch (e) {
    throw new Error("Oop's something went wrong");
  }
};

export const fetchSinglePokemon = async (name: any) => {
  try {
    const { data } = await api.get<ISingleRoutPokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    console.log(data);

    return data;
  } catch (e) {
    throw new Error("Oop's something went wrong");
  }
};
