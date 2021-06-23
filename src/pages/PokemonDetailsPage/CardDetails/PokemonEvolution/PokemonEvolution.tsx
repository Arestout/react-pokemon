import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Heading } from 'components/Heading/Heading';
import { PokemonEvolutionsResult } from 'reduxApp/pokemons';

import './PokemonEvolution.styles.scss';

interface IPokemonEvolution {
  pokemonEvolutions: PokemonEvolutionsResult;
}

const hoverVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export const PokemonEvolution = ({
  pokemonEvolutions,
}: IPokemonEvolution): JSX.Element => {
  const transformId = (id: number) => id.toString().padStart(3, '0');
  const transformName = (name: string) => name[0].toUpperCase() + name.slice(1);

  return (
    <div className="details-card__evolution">
      <Heading tag="h3" className="details-card__subheading">
        Evolution chain
      </Heading>
      <div className="details-card__evolution-wrapper">
        {pokemonEvolutions.map((evolution, index) => (
          <div
            className="details-card__evolution-unit"
            key={evolution.pokemon.id}
          >
            <Link to={`/pokemon/${evolution.pokemon.name}`}>
              <motion.div
                initial="initial"
                whileHover="hover"
                className="evolution-level__info"
              >
                <span>#{transformId(evolution.pokemon.id)}</span>
                <p>{transformName(evolution.pokemon.name)}</p>
                <motion.img
                  // whileHover={{
                  //   scale: 1.05,
                  // }}
                  // whileTap={{ scale: 1.02 }}
                  // transition={{ duration: 0.2 }}
                  variants={hoverVariants}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.pokemon.id}.png`}
                  alt={evolution.pokemon.name}
                />
              </motion.div>
            </Link>

            <div className="evolution-unit__level">
              {index + 1 !== pokemonEvolutions.length ? '>>' : ''}
              {evolution.min_level > 0 && (
                <span>Evolves at level {evolution.min_level}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
