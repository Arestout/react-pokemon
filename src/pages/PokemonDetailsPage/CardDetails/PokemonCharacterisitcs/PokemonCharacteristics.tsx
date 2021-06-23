import React from 'react';
import cn from 'classnames';

import { Pokemon, PokemonSpecies } from 'reduxApp/pokemons';

import './PokemonCharacteristics.styles.scss';

interface IPokemonCharacteristics {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  type: string;
}

export const PokemonCharacteristics = ({
  pokemon,
  pokemonSpecies,
  type,
}: IPokemonCharacteristics): JSX.Element => {
  const { base_experience } = pokemon;
  const { capture_rate, base_happiness, egg_groups } = pokemonSpecies;

  const characteristics = {
    height: pokemon.height * 10 + ' cm',
    weight: Math.round(pokemon.weight * 0.1) + ' kg',
    experience: base_experience,
    catchRate: Math.round((capture_rate * 100) / 255) + ' %',
    happiness: Math.round((base_happiness * 100) / 255) + ' %',
    eggGroups: egg_groups
      .map((group) => group.name[0].toUpperCase() + pokemon.name.slice(1))
      .join(', '),
    abilities: pokemon.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', '),
  };

  return (
    <div className={cn('details-card__characteristics', `background--${type}`)}>
      {Object.entries(characteristics).map((entry) => (
        <div className="details-card__characteristics-unit" key={entry[0]}>
          <div className="characteristic">{entry[1]}</div>
          <div className="characteristic-value">{entry[0]}</div>
        </div>
      ))}
    </div>
  );
};
