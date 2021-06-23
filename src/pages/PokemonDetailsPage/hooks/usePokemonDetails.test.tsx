import React, { ReactNode } from 'react';
import { api } from 'api/api';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { usePokemonDetails } from './usePokemonDetails';
import {
  errorMessage,
  pokemon as pokemonResponse,
  pokemonEvolutionsResponse,
  pokemonEvolutionsResultResponse,
  pokemonSpeciesResponse,
} from '../../../../internals/__mocks__/mockValues';
import { store } from 'reduxApp/store';

jest.mock('api/api');

const apiMock = api as jest.Mocked<typeof api>;
type Wrapper = {
  children: ReactNode;
};

describe('usePokemonDetails', () => {
  const wrapper = ({ children }: Wrapper) => (
    <Provider store={store}>{children}</Provider>
  );

  beforeEach(() => {
    apiMock.get.mockClear();
  });
  it('should fetch pokemon data', async () => {
    apiMock.get.mockResolvedValue({ data: pokemonResponse });
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.pokemon).toEqual(null);
    await waitForNextUpdate();
    expect(result.current.pokemon).toEqual(pokemonResponse);
  });

  it('should fetch pokemon species data', async () => {
    apiMock.get
      .mockResolvedValueOnce({ data: pokemonResponse })
      .mockResolvedValueOnce({ data: pokemonSpeciesResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResultResponse });
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.pokemonSpecies).toEqual(null);
    await waitForNextUpdate();
    expect(result.current.pokemonSpecies).toEqual(pokemonSpeciesResponse);
  });

  it('should fetch pokemon evolutions data', async () => {
    apiMock.get
      .mockResolvedValueOnce({ data: pokemonResponse })
      .mockResolvedValueOnce({ data: pokemonSpeciesResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResultResponse.pokemon });
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.pokemonEvolutions).toEqual(null);
    await waitForNextUpdate();
    expect(result.current.pokemonEvolutions).toEqual([
      {
        pokemon: pokemonEvolutionsResultResponse.pokemon,
        min_level: pokemonEvolutionsResultResponse.min_level,
      },
    ]);
  });

  it(`should set the errorMessage to ${errorMessage.message} if pokemon data fetching rejects`, async () => {
    apiMock.get.mockRejectedValueOnce(errorMessage);
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.errorMessage).toEqual('');
    await waitForNextUpdate();
    expect(result.current.errorMessage).toEqual(errorMessage.message);
  });

  it(`should set the errorMessage to ${errorMessage.message} if pokemon species fetching rejects`, async () => {
    apiMock.get
      .mockResolvedValueOnce({ data: pokemonResponse })
      .mockRejectedValueOnce(errorMessage);
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.errorMessage).toEqual('');
    await waitForNextUpdate();
    expect(result.current.errorMessage).toEqual(errorMessage.message);
  });

  it(`should set the errorMessage to ${errorMessage.message} if pokemon evolutions fetching rejects`, async () => {
    apiMock.get
      .mockResolvedValueOnce({ data: pokemonResponse })
      .mockResolvedValueOnce({ data: pokemonSpeciesResponse })
      .mockRejectedValueOnce(errorMessage);
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.errorMessage).toEqual('');
    await waitForNextUpdate();
    expect(result.current.errorMessage).toEqual(errorMessage.message);
  });

  it(`should NOT set the errorMessage to ${errorMessage.message} if pokemon evolutions result fetching rejects`, async () => {
    apiMock.get
      .mockResolvedValueOnce({ data: pokemonResponse })
      .mockResolvedValueOnce({ data: pokemonSpeciesResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResponse })
      .mockRejectedValueOnce(errorMessage);
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.errorMessage).toEqual('');
    await waitForNextUpdate();
    expect(result.current.errorMessage).toEqual('');
  });

  it(`should set loading to true at start and to false at the end`, async () => {
    apiMock.get
      .mockResolvedValueOnce({ data: pokemonResponse })
      .mockResolvedValueOnce({ data: pokemonSpeciesResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResponse })
      .mockResolvedValueOnce({ data: pokemonEvolutionsResultResponse.pokemon });
    const { result, waitForNextUpdate } = renderHook(
      () => usePokemonDetails('bulbasaur'),
      { wrapper }
    );

    expect(result.current.isLoading).toEqual(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toEqual(false);
  });
});
