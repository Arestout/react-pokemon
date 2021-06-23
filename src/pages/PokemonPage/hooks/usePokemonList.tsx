import { useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { fetchPokemonList, PokemonList } from 'reduxApp/pokemons';
import { RootStateType } from 'reduxApp/rootReducer';

interface IUsePokemonList {
  isLoading: boolean;
  errorMessage: string;
  pokemonList: PokemonList;
  count: number;
  fetchPokemons: () => void;
}

export const usePokemonList = (page = 1): IUsePokemonList => {
  const dispatch = useDispatch();

  const { isLoading, errorMessage, pokemonList, count } = useSelector(
    (state: RootStateType) => state.pokemonList,
    shallowEqual
  );

  const fetchPokemons = useCallback(() => {
    dispatch(fetchPokemonList(page));
  }, [dispatch, page]);

  return {
    isLoading,
    errorMessage,
    pokemonList,
    count,
    fetchPokemons,
  };
};
