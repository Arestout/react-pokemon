import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { api } from 'api/api';
import { store } from 'reduxApp/store';
import { usePokemonMoves } from './usePokemonMoves';
import {
  pokemon as pokemonResponse,
  pokemonMovesResponse,
} from '../../../../../../internals/__mocks__/mockValues';

jest.mock('api/api');

const apiMock = api as jest.Mocked<typeof api>;
type Wrapper = {
  children: ReactNode;
};

describe('usePokemonMoves', () => {
  const wrapper = ({ children }: Wrapper) => (
    <Provider store={store}>{children}</Provider>
  );

  beforeEach(() => {
    apiMock.get.mockClear();
  });
  it('should fetch pokemon moves for the page 0', async () => {
    apiMock.get.mockResolvedValueOnce({ data: pokemonMovesResponse });

    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonMoves(pokemonResponse.moves, 0),
      {
        wrapper,
      }
    );

    expect(result.current.pokemonMoves).toEqual({});
    await waitForNextUpdate();
    expect(result.current.pokemonMoves).toEqual({
      '0': [pokemonMovesResponse],
    });
  });

  it(`should set loading to true at start and to false at the end`, async () => {
    apiMock.get.mockResolvedValueOnce({ data: pokemonMovesResponse });
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonMoves(pokemonResponse.moves, 0),
      { wrapper }
    );

    expect(result.current.isLoading).toEqual(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toEqual(false);
  });
});
