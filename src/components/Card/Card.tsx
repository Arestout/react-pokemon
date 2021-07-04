import React from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';

import './Card.styles.scss';
import { Pokemon } from 'reduxApp/pokemons';

interface ICard {
  pokemon: Pokemon;
}

export const Card = ({ pokemon }: ICard): JSX.Element => {
  const { base_experience: experience, sprites } = pokemon;
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const type = pokemon.types[0].type.name;
  const height = pokemon.height * 10;
  const weight = Math.round(pokemon.weight * 0.1);
  const id = pokemon.id.toString().padStart(3, '0');

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="card"
    >
      <div className="card__image">
        <img
          src={`${sprites.other['official-artwork'].front_default}`}
          alt={name}
          width="240"
          height="240"
          loading="lazy"
        />
      </div>
      <div className="card__level">#{id}</div>
      <div className="card__unit-name">{name}</div>
      <div className="card__unit-description">
        Type: <span className={`background--${type}`}>{type}</span>
      </div>

      <div className={cn('card__unit-stats', `background--${type}`)}>
        <div className="one-third">
          <div className="stat">{experience}</div>
          <div className="stat-value">Experience</div>
        </div>

        <div className="one-third">
          <div className="stat">{weight} kg</div>
          <div className="stat-value">Weight</div>
        </div>

        <div className="one-third no-border">
          <div className="stat">{height} cm</div>
          <div className="stat-value">Height</div>
        </div>
      </div>
    </motion.div>
  );
};
