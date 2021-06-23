import * as types from './pokemons.types';
import { ThunkAction } from 'redux-thunk';

import type { RootStateType } from 'reduxApp/rootReducer';

import { api, API_URL } from 'api/api';

export type ThunkType<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  types.PokemonListActionTypes
>;

export const fetchPokemonListStart = (): types.PokemonListActionTypes => ({
  type: types.FETCH_POKEMON_LIST_START,
});

export const fetchPokemonListSuccess = (
  pokemonList: types.PokemonListFetchResultDetails
): types.PokemonListActionTypes => ({
  type: types.FETCH_POKEMON_LIST_SUCCESS,
  payload: pokemonList,
});

export const fetchPokemonListFailure = (
  errorMessage: string
): types.PokemonListActionTypes => ({
  type: types.FETCH_POKEMON_LIST_FAILURE,
  payload: errorMessage,
});

export const fetchPokemonList = (page = 1): ThunkType => async (dispatch) => {
  try {
    dispatch(fetchPokemonListStart());
    const limit = 20;
    const offset = page === 1 ? 0 : limit * (page - 1);
    const response = await api
      .get<types.PokemonListFetchResult>(
        `${API_URL}/pokemon?offset=${offset}&limit=${limit}`
      )
      .then((result) => result.data);

    const promiseArray = response.results.map(async (pokemon) => {
      const result = await api
        .get<types.Pokemon>(`${pokemon.url}`)
        .then((result) => result.data);
      return result;
    });

    const pokemonList = await Promise.all(promiseArray);

    if (pokemonList.length === 0) {
      dispatch(fetchPokemonListFailure('404. Page not found.'));
      return;
    }

    dispatch(fetchPokemonListSuccess({ count: response.count, pokemonList }));
  } catch (error) {
    dispatch(fetchPokemonListFailure(error.message));
  }
};
