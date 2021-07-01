import React from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

import { usePokemonDetails } from './hooks/usePokemonDetails';
import { CardDetails } from './CardDetails';
import { Spinner } from './../../components/Spinner';
import { ErrorMessage } from 'components/ErrorMessage';
import { Button } from 'components/Button';
import { useLocation } from 'react-router-dom';

import './PokemonDetailsPage.styles.scss';

const buttonVariants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export const PokemonDetailsPage = (): JSX.Element => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation<{ page: number }>();
  const locationPage = location.state?.page
    ? `/page/${location.state.page}`
    : '/';

  const { pokemonDetails, isLoading, errorMessage } = usePokemonDetails(name);
  const { pokemon, pokemonSpecies, pokemonEvolutions } = pokemonDetails;
  const description = `Details of ${pokemon ? pokemon.name : ''}`;

  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      className="container"
    >
      <Helmet>
        <title>
          Pokemon Details: {pokemon ? pokemon.name : ''} - Cool Pokemon App
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <motion.div
        className="card-container__btn-wrapper"
        variants={buttonVariants}
      >
        <Button
          tag="a"
          to={locationPage === '/page/1' ? '/' : locationPage}
          label="Back to list"
        />
      </motion.div>
      {pokemon && pokemonSpecies && (
        <CardDetails
          pokemon={pokemon}
          pokemonSpecies={pokemonSpecies}
          pokemonEvolutions={pokemonEvolutions}
        />
      )}
    </motion.div>
  );
};
