import { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { fetchPokemonList, PokemonList } from 'reduxApp/pokemons';
import { RootStateType } from 'reduxApp/rootReducer';
import { CancelToken } from 'axios';

interface IUsePokemonList {
  isLoading: boolean;
  errorMessage: string;
  pokemonList: PokemonList;
  count: number;
  fetchPokemons: (cancelToken: CancelToken) => void;
}

export const usePokemonList = (page = 1): IUsePokemonList => {
  const dispatch = useDispatch();

  const { isLoading, errorMessage, pokemonList, count } = useSelector(
    (state: RootStateType) => state.pokemonList,
    shallowEqual
  );

  const fetchPokemons = useCallback(
    (cancelToken: CancelToken) => {
      dispatch(fetchPokemonList(page, cancelToken));
    },
    [dispatch, page]
  );

  return {
    isLoading,
    errorMessage,
    pokemonList,
    count,
    fetchPokemons,
  };
};
