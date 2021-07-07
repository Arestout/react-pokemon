import { useEffect, useState } from 'react';
import { api } from 'api/api';
import { PokemonMovesSource } from 'reduxApp/pokemons';

export type IPokemonMove = {
  name: string;
  type: { name: string };
  power: number;
  accuracy: number;
  pp: number;
};

type PokemonMovesResult = {
  pokemonMoves: Record<string, IPokemonMove[]>;
  isLoading: boolean;
  errorMessage: string;
};

// const initialState = {
//   pokemonMoves: {},
//   isLoading: false,
//   errorMessage: '',
// };

export const usePokemonMoves = (
  pokemonMovesSource: PokemonMovesSource[],
  page = 0
): PokemonMovesResult => {
  const limit = 5;

  const [pokemonMoves, setPokemonMoves] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (
      pokemonMovesSource.length === 0 ||
      pokemonMoves.hasOwnProperty(String(page))
    ) {
      return;
    }

    const begin = limit * page;
    const end = page * limit + limit;

    async function getPokemonMove() {
      try {
        setIsLoading(true);
        const pokemonMovesResult: IPokemonMove[] = await Promise.all(
          pokemonMovesSource
            .slice(begin, end)
            .map(
              async (move) =>
                await api.get(move.move.url).then((response) => response.data)
            )
        );
        setPokemonMoves((prevState) => {
          return { ...prevState, [page]: pokemonMovesResult };
        });
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getPokemonMove();
  }, [pokemonMovesSource, page, pokemonMoves]);

  return { pokemonMoves, isLoading, errorMessage };
};
