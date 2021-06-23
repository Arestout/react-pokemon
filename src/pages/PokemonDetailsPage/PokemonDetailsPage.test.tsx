import React from 'react';
import { screen, waitFor, cleanup } from '@testing-library/react';
import { render } from '../../../internals/test-utils';

import { PokemonDetailsPage } from './PokemonDetailsPage';
import * as hooks from './hooks/usePokemonDetails';
import {
  pokemon,
  pokemonEvolutionsResultResponse,
  pokemonSpeciesResponse,
} from '../../../internals/__mocks__/mockValues';

describe('PokemonDetailsPage', () => {
  describe('with evolution chain', () => {
    beforeAll(() => {
      const stubbedResponse: hooks.IUsePokemonList = {
        pokemon: pokemon,
        isLoading: false,
        errorMessage: '',
        pokemonSpecies: pokemonSpeciesResponse,
        pokemonEvolutions: [pokemonEvolutionsResultResponse],
      };
      jest
        .spyOn(hooks, 'usePokemonDetails')
        .mockImplementation(() => stubbedResponse);
    });

    beforeEach(() => {
      render(<PokemonDetailsPage />, {
        route: '/pokemon/bulbasaur',
      });
    });

    afterEach(() => {
      cleanup();
    });

    it('should render statistics', async () => {
      await waitFor(() => {
        expect(screen.getByText('Stats')).toBeInTheDocument();
      });
    });

    it('should render evolution chain', async () => {
      await waitFor(() => {
        expect(screen.getByText('Evolution chain')).toBeInTheDocument();
      });
    });

    it('should render characteristics', async () => {
      await waitFor(() => {
        expect(screen.getByText('height')).toBeInTheDocument();
      });
    });
  });

  describe('without evolution chain', () => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    beforeAll(() => {
      const stubbedResponse: hooks.IUsePokemonList = {
        pokemon: pokemon,
        isLoading: false,
        errorMessage: '',
        pokemonSpecies: pokemonSpeciesResponse,
        pokemonEvolutions: null,
      };
      jest
        .spyOn(hooks, 'usePokemonDetails')
        .mockImplementation(() => stubbedResponse);
    });

    beforeEach(() => {
      render(<PokemonDetailsPage />, {
        route: '/pokemon/bulbasaur',
      });
    });

    afterEach(() => {
      cleanup();
    });

    it(`should render  as h2 heading`, async () => {
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
          name
        );
      });
    });

    it('should not render evolution chain', async () => {
      await waitFor(() => {
        expect(screen.queryByText('Evolution chain')).not.toBeInTheDocument();
      });
    });
  });
});
