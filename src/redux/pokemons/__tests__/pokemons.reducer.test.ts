import * as actions from '../pokemons.actions';
import { pokemonListReducer, IPokemonListState } from '../pokemons.reducer';
import {
  errorMessage,
  responseData,
} from '../../../../internals/__mocks__/mockValues';

let initialState: IPokemonListState;

describe('movies reducer', () => {
  beforeEach(() => {
    initialState = {
      isLoading: false,
      pokemonList: [],
      count: 0,
      errorMessage: '',
    };
  });

  it('should set loading to true', () => {
    expect(pokemonListReducer(void 0, actions.fetchPokemonListStart())).toEqual(
      {
        ...initialState,
        isLoading: true,
      }
    );
  });

  it('should update the moviesList and set loading to false', () => {
    expect(
      pokemonListReducer(void 0, actions.fetchPokemonListSuccess(responseData))
    ).toEqual({
      isLoading: false,
      pokemonList: responseData.pokemonList,
      count: responseData.count,
      errorMessage: '',
    });
  });

  it('should update the error message and set loading to false', () => {
    expect(
      pokemonListReducer(
        void 0,
        actions.fetchPokemonListFailure(errorMessage.message)
      )
    ).toEqual({
      ...initialState,
      errorMessage: errorMessage.message,
      isLoading: false,
    });
  });
});
