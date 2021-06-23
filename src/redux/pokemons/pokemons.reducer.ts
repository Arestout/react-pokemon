import * as types from './pokemons.types';

export interface IPokemonListState {
  isLoading: boolean;
  pokemonList: types.PokemonList;
  count: number;
  errorMessage: string;
}

export const initialState: IPokemonListState = {
  isLoading: false,
  pokemonList: [],
  count: 0,
  errorMessage: '',
};

// eslint-disable-next-line
const neverReached = (_never: never) => {};

export const pokemonListReducer = (
  state = initialState,
  action: types.PokemonListActionTypes
): IPokemonListState => {
  switch (action.type) {
    case types.FETCH_POKEMON_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokemonList: action.payload.pokemonList,
        count: action.payload.count,
        isLoading: false,
      };
    case types.FETCH_POKEMON_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    default:
      neverReached(action);
  }
  return state;
};
