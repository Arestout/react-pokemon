import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { motion, useReducedMotion } from 'framer-motion';

import { usePokemonDetails } from './hooks/usePokemonDetails';
import { CardDetails } from './CardDetails';
import { Spinner } from './../../components/Spinner';
import { ErrorMessage } from 'components/ErrorMessage';
import { Button } from 'components/Button';
import { useLocation } from 'react-router-dom';

import './PokemonDetailsPage.styles.scss';

const easing = [0.48, 0.15, 0.25, 0.96];
const buttonVariants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easing },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.5, ease: easing },
  },
};

export const PokemonDetailsPage = (): JSX.Element => {
  const shouldReduceMotion = useReducedMotion();
  const { name } = useParams<{ name: string }>();
  const location = useLocation<{ page: number }>();
  const locationPage = location.state?.page
    ? `/page/${location.state.page}`
    : '/';

  const isMountedRef = useRef(false);
  const { pokemonDetails, isLoading, errorMessage } = usePokemonDetails(
    name,
    isMountedRef
  );
  const { pokemon, pokemonSpecies, pokemonEvolutions } = pokemonDetails;
  const description = `Details of ${pokemon ? pokemon.name : ''}`;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
      {pokemon && (
        <Helmet>
          <title>Pokemon Details: {pokemon.name} - Cool Pokemon App</title>
          <meta name="description" content={description} />
        </Helmet>
      )}
      <motion.div
        className="card-container__btn-wrapper"
        variants={shouldReduceMotion ? {} : buttonVariants}
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
