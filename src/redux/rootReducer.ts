import { combineReducers } from 'redux';

import { pokemonListReducer } from './pokemons';

export const rootReducer = combineReducers({
  pokemonList: pokemonListReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
