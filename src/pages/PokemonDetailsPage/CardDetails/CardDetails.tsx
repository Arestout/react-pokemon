import React from 'react';
import { motion } from 'framer-motion';

import {
  Pokemon,
  PokemonEvolutionsResult,
  PokemonSpecies,
} from 'reduxApp/pokemons';
import { Heading } from 'components/Heading/Heading';
import { Progress } from 'components/Progress/Progress';
import { PokemonEvolution } from './PokemonEvolution';
import { PokemonCharacteristics } from './PokemonCharacterisitcs';

import './CardDetails.styles.scss';

interface ICardDetails {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  pokemonEvolutions: PokemonEvolutionsResult | null;
}

const easing = [0.175, 0.85, 0.42, 0.96];
const animationVariants = {
  exit: {
    y: 150,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.175, 0.85, 0.42, 0.96] },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

export const CardDetails = ({
  pokemon,
  pokemonSpecies,
  pokemonEvolutions,
}: ICardDetails): JSX.Element => {
  const transformId = (id: number) => id.toString().padStart(3, '0');
  const transformName = (name: string) => name[0].toUpperCase() + name.slice(1);

  const { stats, sprites } = pokemon;
  const name = transformName(pokemon.name);
  const type = pokemon.types[0].type.name;
  const types = pokemon.types.map((type) => type.type.name);
  const englishDescription = pokemonSpecies.flavor_text_entries.find(
    (flavor) => flavor.language.name === 'en'
  );
  const description = englishDescription
    ? englishDescription.flavor_text
        .replace('\f', '\n')
        .replace('\u00ad\n', '')
        .replace('\u00ad', '')
        .replace(' -\n', ' - ')
        .replace('-\n', '-')
        .replace('\n', ' ')
    : '';
  const id = transformId(pokemon.id);

  return (
    <motion.div variants={animationVariants} className="details-card">
      <div className="details-card__content-wrapper">
        <div className="details-card__image-wrapper">
          <div className="details-card__image">
            <img
              src={`${sprites.other['official-artwork'].front_default}`}
              alt={name}
            />
          </div>
          <div className="details-card__image-content">
            <div className="details-card__level">#{id}</div>
            <div className="details-card__unit-description">
              Types:
              {types.map((type) => (
                <span className={`background--${type}`} key={type}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="details-card__content">
          <div className="details-card__content-text">
            <Heading tag="h2" className="details-card__heading">
              {name}
            </Heading>
            <p>{description}</p>
          </div>

          <div className="details-card__stats">
            <Heading tag="h3" className="details-card__subheading">
              Stats
            </Heading>
            {stats.map((stats) => (
              <Progress
                value={stats.base_stat}
                label={stats.stat.name}
                key={stats.stat.name}
              />
            ))}
          </div>

          {pokemonEvolutions && (
            <PokemonEvolution pokemonEvolutions={pokemonEvolutions} />
          )}
        </div>
      </div>

      <PokemonCharacteristics
        pokemon={pokemon}
        pokemonSpecies={pokemonSpecies}
        type={type}
      />
    </motion.div>
  );
};
