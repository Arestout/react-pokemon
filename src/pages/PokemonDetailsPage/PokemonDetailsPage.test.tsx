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
        pokemonDetails: {
          pokemon,
          pokemonSpecies: pokemonSpeciesResponse,
          pokemonEvolutions: [pokemonEvolutionsResultResponse],
        },
        isLoading: false,
        errorMessage: '',
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
        expect(
          screen.getByRole('heading', { name: 'Stats', level: 3 })
        ).toBeInTheDocument();
        expect(screen.getByText('hp')).toBeInTheDocument();
        expect(screen.getByText('attack')).toBeInTheDocument();
        expect(screen.getByText('defense')).toBeInTheDocument();
        expect(screen.getByText('special-attack')).toBeInTheDocument();
        expect(screen.getByText('special-defense')).toBeInTheDocument();
        expect(screen.getByText('speed')).toBeInTheDocument();
      });
    });

    it('should render evolution chain', async () => {
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Evolution chain', level: 3 })
        ).toBeInTheDocument();
      });
    });

    it('should render characteristics', async () => {
      await waitFor(() => {
        expect(screen.getByText('height')).toBeInTheDocument();
      });
    });

    it('should render moves', async () => {
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Moves', level: 3 })
        ).toBeInTheDocument();
        expect(screen.queryAllByRole('row')).toHaveLength(6);
        expect(screen.queryAllByRole('cell')).toHaveLength(25);
      });
    });
  });

  describe('without evolution chain', () => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    beforeAll(() => {
      const stubbedResponse: hooks.IUsePokemonList = {
        pokemonDetails: {
          pokemon,
          pokemonSpecies: pokemonSpeciesResponse,
          pokemonEvolutions: null,
        },
        isLoading: false,
        errorMessage: '',
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

    it(`should render as h2 heading`, async () => {
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
