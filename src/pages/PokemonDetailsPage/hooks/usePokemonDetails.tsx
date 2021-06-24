import { api, API_URL } from 'api/api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Pokemon,
  PokemonEvolutionsResult,
  PokemonSpecies,
} from 'reduxApp/pokemons';
import { RootStateType } from 'reduxApp/rootReducer';

export interface IUsePokemonList {
  isLoading: boolean;
  errorMessage: string;
  pokemon: Pokemon | null;
  pokemonSpecies: PokemonSpecies | null;
  pokemonEvolutions: PokemonEvolutionsResult | null;
}

export const usePokemonDetails = (name: string): IUsePokemonList => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [
    pokemonEvolutions,
    setPokemonEvolutions,
  ] = useState<PokemonEvolutionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pokemon = useSelector((state: RootStateType) =>
    state.pokemonList.pokemonList.find((pokemon) => pokemon.name === name)
  );

  useEffect(() => {
    if (pokemon) {
      setPokemonDetails(pokemon);
    }

    async function getPokemonDetails() {
      try {
        setIsLoading(true);

        if (!pokemonDetails) {
          const pokemon: Pokemon = await api
            .get(`${API_URL}/pokemon/${name}/`)
            .then((response) => response.data);
          setPokemonDetails(pokemon);
        }

        if (pokemonDetails) {
          const pokemonSpecies: PokemonSpecies = await api
            .get(pokemonDetails.species.url)
            .then((response) => response.data);

          const pokemonEvolutions: PokemonEvolutions = await api
            .get(pokemonSpecies.evolution_chain.url)
            .then((response) => response.data);
          const evolutionChainList: PokemonEvolutionsList = getEvolutionChain(
            pokemonEvolutions
          );

          try {
            const evolutionChainResult: PokemonEvolutionsResult = await Promise.all(
              evolutionChainList.map(async (evolution) => {
                const result = await api
                  .get(`${API_URL}/pokemon/${evolution.species_name}/`)
                  .then((response) => response.data);

                return {
                  pokemon: result,
                  min_level: evolution.min_level,
                };
              })
            );
            setPokemonEvolutions(evolutionChainResult);
          } catch (error) {
            // eslint-disable-next-line
            console.log('Failed to fetch evolutions data: ', error.message);
          }

          setPokemonSpecies(pokemonSpecies);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getPokemonDetails();
  }, [name, pokemonDetails]);

  return {
    isLoading,
    errorMessage,
    pokemon: pokemonDetails,
    pokemonSpecies,
    pokemonEvolutions,
  };
};

type PokemonEvolutions = {
  chain: {
    species: {
      name: string;
    };
    evolves_to: [
      {
        evolution_details: [
          {
            min_level: number;
          }
        ];
      }
    ];
  };
};

type PokemonEvolutionsList = Array<{
  species_name: string;
  min_level: number;
}>;

function getEvolutionChain(data: PokemonEvolutions): PokemonEvolutionsList {
  const evolutionChain = [];
  let evolutionData = data.chain;

  do {
    evolutionChain.push({
      species_name: evolutionData.species.name,
      min_level: !evolutionData.evolves_to[0]
        ? 0
        : evolutionData.evolves_to[0].evolution_details[0].min_level,
    });

    /* @ts-ignore */
    evolutionData = evolutionData.evolves_to[0];
  } while (!!evolutionData && evolutionData.hasOwnProperty('evolves_to'));

  return evolutionChain;
}
