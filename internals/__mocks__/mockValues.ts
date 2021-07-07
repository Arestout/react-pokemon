import { PokemonSpecies } from 'reduxApp/pokemons';

export const pokemon = {
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      isHidden: false,
      slot: 1,
    },
  ],
  base_experience: 64,
  forms: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
    },
  ],
  height: 7,
  id: 1,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
  name: 'bulbasaur',
  order: 1,
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      },
    },
  },
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 87,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 105,
      effort: 3,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: 53,
      effort: 0,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 67,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
  ],
  moves: [
    {
      move: {
        name: 'razor-wind',
        url: 'https://pokeapi.co/api/v2/move/13/',
      },
    },
  ],
  weight: 1,
  species: {
    url: 'string',
  },
  capture_rate: 22,
};

export const errorMessage = { message: 'Error message' };

export const firstApiResponse = {
  data: {
    count: 500,
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ],
  },
};

export const responseData = {
  count: 500,
  pokemonList: [pokemon],
};

export const pokemonSpeciesResponse: PokemonSpecies = {
  capture_rate: 45,
  base_happiness: 70,
  flavor_text_entries: [
    {
      flavor_text: 'string',
      language: {
        name: 'en',
      },
    },
  ],
  egg_groups: [
    {
      name: 'string',
    },
  ],
  evolution_chain: {
    url: 'string',
  },
};

export const pokemonEvolutionsResponse = {
  chain: {
    species: {
      name: 'ivysaur',
    },
    evolves_to: [
      {
        evolution_details: [
          {
            min_level: 16,
          },
        ],
      },
    ],
  },
};

export const pokemonEvolutionsResultResponse = {
  pokemon,
  min_level: 16,
};

export const pokemonMovesResponse = {
  accuracy: 100,
  power: 80,
  pp: 10,
  name: 'razor-wind',
  type: { name: 'normal' },
};
