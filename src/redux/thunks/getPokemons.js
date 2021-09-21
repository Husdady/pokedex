/* Librarys */
import axios from 'axios';

/* JS */
import { isEmptyArray } from '@assets/js/typeof';

/* Types */
import { HIDE_LOADING, GET_POKEMONS, GET_ALL_POKEMONS, ERROR_GETTING_ALL_POKEMONS } from '@redux/types';

/* Thunks */
import limit from './_limit';
import getInfoPokemon from './getInfoPokemon';

const fetchAll = 'https://pokeapi.co/api/v2/pokemon?limit=1500';
const fetchSome = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;

const getPokemons = () => {
  return async (dispatch, getStore) => {

    const { all, some } = getStore().pokemons;
    const promises = isEmptyArray(some)
      ? [fetchSome, fetchAll]
      : [fetchSome];

    try {
      const fetchUrls = promises.map(url => axios({ url, timeout: 15000 }));
      const urls = await Promise.all(fetchUrls);
      const results = urls.map(url => url.data.results);
      results.map(async pks => {
        const pokemons = await getInfoPokemon(pks);
        if (pokemons.length <= limit) {
          pokemons !== some && dispatch({ type: GET_POKEMONS, pokemons });
        } else {
          isEmptyArray(all) && dispatch({ type: GET_ALL_POKEMONS, pokemons });
        }
        dispatch({ type: HIDE_LOADING });
      });
    } catch (error) {
      dispatch({ type: ERROR_GETTING_ALL_POKEMONS, error });
    }
  }
}

export default getPokemons;
