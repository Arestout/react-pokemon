import { combineReducers, createStore } from 'redux';

import { pokemonListReducer } from './pokemons';

import { store } from './store';

const referenceRootReducer = combineReducers({
  pokemonList: pokemonListReducer,
});

const referenceStore = createStore(referenceRootReducer);

describe('store:', () => {
  it('should have valid state shape', () => {
    expect(store.getState()).toEqual(referenceStore.getState());
  });
});
