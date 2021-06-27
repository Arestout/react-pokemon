export type Pokemon = {
  name: string;
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  order: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
  stats: Stats[];
  types: Type[];
  weight: number;
  capture_rate: number;
};

export type PokemonSpecies = {
  capture_rate: number;
  base_happiness: number;
  flavor_text_entries: [
    {
      flavor_text: string;
      language: {
        name: string;
      };
    }
  ];
  egg_groups: [
    {
      name: string;
    }
  ];
  evolution_chain: {
    url: string;
  };
};

export type PokemonEvolutionsResult = Array<{
  pokemon: Pokemon;
  min_level: number;
}>;

export type PokemonList = Pokemon[];
export type PokemonListFetchResult = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};
export type PokemonListFetchResultDetails = {
  count: number;
  pokemonList: PokemonList;
};

export const FETCH_POKEMON_LIST_START = 'FETCH_POKEMON_LIST_START';
export type FetchPokemonListStartAction = {
  type: typeof FETCH_POKEMON_LIST_START;
};

export const FETCH_POKEMON_LIST_SUCCESS = 'FETCH_POKEMON_LIST_SUCCESS';
export type FetchPokemonListSuccessAction = {
  type: typeof FETCH_POKEMON_LIST_SUCCESS;
  payload: PokemonListFetchResultDetails;
};

export const FETCH_POKEMON_LIST_FAILURE = 'FETCH_POKEMON_LIST_FAILURE';
export type FetchpokemonListFailureAction = {
  type: typeof FETCH_POKEMON_LIST_FAILURE;
  payload: string;
};

export type PokemonListActionTypes =
  | FetchPokemonListStartAction
  | FetchPokemonListSuccessAction
  | FetchpokemonListFailureAction;

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
};

type Form = {
  name: string;
  url: string;
};

type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
