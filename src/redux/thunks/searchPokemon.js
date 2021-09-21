import { SEARCH_POKEMON, SHOW_LOADING, HIDE_LOADING } from '@redux/types';

const searchPokemon = name => {
  return (dispatch, getStore) => {
    const all_pokemons = getStore().pokemons.all;
    dispatch({ type: SHOW_LOADING });
    dispatch({
      type: SEARCH_POKEMON,
      pokemons: all_pokemons,
      pokemon_name: name
    });
    setTimeout(() => dispatch({ type: HIDE_LOADING }), 800);
  }
}

export default searchPokemon;
