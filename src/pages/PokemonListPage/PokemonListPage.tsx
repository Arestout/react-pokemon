import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Pagination } from '@material-ui/lab';
import { motion, useReducedMotion } from 'framer-motion';
import axios from 'axios';

import { usePokemonList } from './hooks/usePokemonList';
import { Card } from 'components/Card/Card';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Spinner } from 'components/Spinner';
import { Heading } from 'components/Heading/Heading';
import { ErrorMessage } from 'components/ErrorMessage';

import './PokemonList.styles.scss';

const easing = [0.48, 0.15, 0.25, 0.96];
const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easing },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: easing },
  },
};

const headingVariants = {
  initial: { opacity: 0, y: 30 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: easing },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2, ease: easing },
  },
};

export const PokemonListPage = (): JSX.Element => {
  const history = useHistory();
  const shouldReduceMotion = useReducedMotion();

  const { page } = useParams<{ page: string }>();
  const currentPage = page ? Number(page) : 1;

  const {
    isLoading,
    errorMessage,
    pokemonList,
    count,
    fetchPokemons,
  } = usePokemonList(currentPage);
  const ITEMS_PER_PAGE = 20;
  const maxPageCount = Math.ceil(count / ITEMS_PER_PAGE);

  const handleChange = (_, page: number) => {
    history.push(`/page/${page}`);
  };

  useEffect(() => {
    const apiRequest = axios.CancelToken.source();
    fetchPokemons(apiRequest.token);

    return () => apiRequest.cancel();
  }, [currentPage, fetchPokemons]);

  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <main>
      <Helmet>
        <title>Pokemon List - Cool Pokemon App</title>
        <meta name="description" content="List of all pokemons" />
      </Helmet>

      <div className="container">
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={shouldReduceMotion ? {} : headingVariants}
        >
          <Heading tag="h1" className="pokemon-list__heading">
            Find out more about your favorite Pokemon
          </Heading>
        </motion.div>

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={
            shouldReduceMotion
              ? {}
              : { exit: { transition: { staggerChildren: 0.01 } } }
          }
          className="card-container"
        >
          {pokemonList.map((pokemon) => (
            <motion.div
              variants={shouldReduceMotion ? {} : postVariants}
              key={pokemon.id}
            >
              <Link
                to={{
                  pathname: `/pokemon/${pokemon.name}`,
                  state: { page: currentPage },
                }}
                className="card-container__link"
              >
                <Card pokemon={pokemon} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="pagination-container">
          <Pagination
            page={currentPage}
            count={maxPageCount}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
            size="large"
          />
        </div>
      </div>
    </main>
  );
};
