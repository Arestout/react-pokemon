import { api, API_URL } from 'api/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Pokemon,
  PokemonEvolutionsResult,
  PokemonSpecies,
} from 'reduxApp/pokemons';
import { RootStateType } from 'reduxApp/rootReducer';

export type PokemonDetails = {
  pokemon: Pokemon | null;
  pokemonSpecies: PokemonSpecies | null;
  pokemonEvolutions: PokemonEvolutionsResult | null;
};

export interface IUsePokemonList {
  isLoading: boolean;
  errorMessage: string;
  pokemonDetails: PokemonDetails;
}

export const usePokemonDetails = (
  name: string,
  isMountedRef: React.MutableRefObject<boolean>
): IUsePokemonList => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({
    pokemon: null,
    pokemonSpecies: null,
    pokemonEvolutions: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedPokemon = useSelector((state: RootStateType) =>
    state.pokemonList.pokemonList.find((pokemon) => pokemon.name === name)
  );

  useEffect(() => {
    if (!name) {
      return;
    }
    const apiRequest = axios.CancelToken.source();
    const cancelToken = apiRequest.token;

    async function getPokemonDetails() {
      try {
        setIsLoading(true);

        const pokemon: Pokemon =
          selectedPokemon ||
          (await api
            .get(`${API_URL}/pokemon/${name}/`, {
              cancelToken,
            })
            .then((response) => response.data));

        const pokemonSpecies: PokemonSpecies = await api
          .get(pokemon.species.url, {
            cancelToken,
          })
          .then((response) => response.data);

        const pokemonEvolutions: PokemonEvolutionsResult | void = await api
          .get(pokemonSpecies.evolution_chain.url, {
            cancelToken,
          })
          .then((response) => response.data)
          .then((result) => getEvolutionChain(result))
          .then((result) =>
            Promise.all(
              result.map(async (evolution) => {
                const result = await api
                  .get(`${API_URL}/pokemon/${evolution.species_name}/`, {
                    cancelToken,
                  })
                  .then((response) => response.data);

                return {
                  pokemon: result,
                  min_level: evolution.min_level,
                };
              })
            )
          )
          .catch((error) => {
            if (axios.isCancel(error)) {
              return;
            }
            // eslint-disable-next-line
            console.log('Failed to fetch evolutions data: ', error.message);
          });

        if (isMountedRef.current) {
          setPokemonDetails({
            pokemon,
            pokemonSpecies,
            pokemonEvolutions: pokemonEvolutions ? pokemonEvolutions : null,
          });
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setErrorMessage(error.message);
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }
    getPokemonDetails();
    return () => apiRequest.cancel();
  }, [name, selectedPokemon, isMountedRef]);

  return {
    isLoading,
    errorMessage,
    pokemonDetails,
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
