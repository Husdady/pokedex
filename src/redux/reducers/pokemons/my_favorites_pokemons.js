/* Types */
import {
  ADD_FAVORITE_POKEMON,
  DELETE_FAVORITE_POKEMON
} from '@redux/types';

/* JS */
import { POKEMON_TO_FAVORITES } from '@assets/js/keys';
import { getKey, setKey } from '@assets/js/localStorage';

const my_favorites_pokemons = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE_POKEMON:
      return [action.pokemon, ...state];
    case DELETE_FAVORITE_POKEMON:
      return state.filter(pokemon => pokemon.name !== action.pokemon);
    default:
      return state;
  }
}

const addFavoritePokemonFromStorage = pokemon => {
  const myFavoritesPokemons = getKey(POKEMON_TO_FAVORITES);
  if (myFavoritesPokemons) {
    setKey(POKEMON_TO_FAVORITES, [...myFavoritesPokemons, pokemon]);
  } else {
    setKey(POKEMON_TO_FAVORITES, [pokemon]);
  }
}

const deleteFavoritePokemonFromStorage = pokemon => {
  const myFavoritesPokemons = getKey(POKEMON_TO_FAVORITES);
  const deletePokemon = myFavoritesPokemons.filter(pk => pk !== pokemon);
  setKey(POKEMON_TO_FAVORITES, deletePokemon);
}

const mapStateToProps = ({ my_favorites_pokemons }) => {
  return { pokemons: my_favorites_pokemons }
}

const mapDispatchToProps = dispatch => {
  return {
    addPokemonToFavorites: pokemon => dispatch({ type: ADD_FAVORITE_POKEMON, pokemon }),
    deletePokemonFromFavorites: pokemon => dispatch({ type: DELETE_FAVORITE_POKEMON, pokemon })
  }
}

export default my_favorites_pokemons;

export {
  mapStateToProps,
  mapDispatchToProps,
  addFavoritePokemonFromStorage,
  deleteFavoritePokemonFromStorage
}
