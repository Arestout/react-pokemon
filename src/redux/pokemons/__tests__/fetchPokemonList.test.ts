import { api } from 'api/api';
import {
  fetchPokemonList,
  fetchPokemonListFailure,
  fetchPokemonListStart,
  fetchPokemonListSuccess,
} from '../pokemons.actions';
import {
  firstApiResponse,
  pokemon,
  responseData,
  errorMessage,
} from '../../../../internals/__mocks__/mockValues';

jest.mock('api/api');

describe('fetchPokemon thunk action', () => {
  const apiMock = api as jest.Mocked<typeof api>;

  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    apiMock.get.mockClear();
  });

  it('should successfully fetch the pokemon list', async () => {
    apiMock.get
      .mockResolvedValueOnce(firstApiResponse)
      .mockResolvedValueOnce({ data: pokemon });

    await fetchPokemonList()(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, fetchPokemonListStart());
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      fetchPokemonListSuccess(responseData)
    );
  });

  it('should dispatch an error message', async () => {
    apiMock.get.mockRejectedValueOnce(errorMessage);

    const action = fetchPokemonList();
    await action(dispatchMock, getStateMock, undefined);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, fetchPokemonListStart());
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      fetchPokemonListFailure(errorMessage.message)
    );
  });
});
