/* JS */
import timeout from '@assets/js/timeout';

/* Types */
import { GET_POKEMONS, ERROR_GETTING_ALL_POKEMONS } from '@redux/types';

/* Thunks */
import limit from './_limit';
import getInfoPokemon from './getInfoPokemon';

const getPokemons = i => {
  return async (dispatch, getStore) => {

    const { some } = getStore().pokemons;

    try {
      const res = await timeout({
        url: `https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=${limit}`,
        time: 7000
      })
      const results = res.data.results;
      const pokemons = await getInfoPokemon(results);
      dispatch({ type: GET_POKEMONS, pokemons: [...some, ...pokemons] });
      return pokemons;
    } catch (error) {
      dispatch({ type: ERROR_GETTING_ALL_POKEMONS, error });
    }
  }
}

export default getPokemons;
