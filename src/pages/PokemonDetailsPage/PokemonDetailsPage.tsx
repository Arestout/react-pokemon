import React from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

import { usePokemonDetails } from './hooks/usePokemonDetails';
import { CardDetails } from './CardDetails';
import { Spinner } from './../../components/Spinner';
import { ErrorMessage } from 'components/ErrorMessage';

export const PokemonDetailsPage = (): JSX.Element => {
  const { name } = useParams<{ name: string }>();

  const {
    pokemon,
    pokemonSpecies,
    pokemonEvolutions,
    isLoading,
    errorMessage,
  } = usePokemonDetails(name);
  const description = `Details of ${pokemon ? pokemon.name : ''}`;

  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <div className="container">
      <Helmet>
        <title>
          Pokemon Details: {pokemon ? pokemon.name : ''} - Cool Pokemon App
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <motion.div initial="exit" animate="enter" exit="exit">
        {pokemon && pokemonSpecies && (
          <CardDetails
            pokemon={pokemon}
            pokemonSpecies={pokemonSpecies}
            pokemonEvolutions={pokemonEvolutions}
          />
        )}
      </motion.div>
    </div>
  );
};
