/* Components */
import Pokemon from '@pokemon/Card';

/* Reducers */
import my_pokemons from './my_pokemons';
import my_favorites_pokemons from './my_favorites_pokemons';

/* TYPES */
import { GET_POKEMONS, GET_ALL_POKEMONS, SEARCH_POKEMON, ERROR_GETTING_ALL_POKEMONS } from '@redux/types';

/* Thunks */
import { getPokemons, getMorePokemons, searchPokemon } from '@redux/thunks';

const initialState = {
  all: [],
  some: [],
  error: {}
}

const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return { ...state, all: action.pokemons, error: {} }
    case GET_POKEMONS:
      return { ...state, some: action.pokemons, error: {} }
    case SEARCH_POKEMON:
      return { ...state, some: action.pokemons.filter(pokemon => {
        const pk_name = pokemon.name.replace(/-/g, ' ').trim();
        return pk_name.includes(action.pokemon_name);
      }), error: {} }
    case ERROR_GETTING_ALL_POKEMONS:
      return { ...state, some: [], error: action.error }
    default:
      return state;
  }
}

export default pokemons;

const mapStateToProps = ({ pokemons, loading }) => {
  return { pokemons: pokemons.some, loading, error: pokemons.error }
}

const mapDispatchToProps = dispatch => {
  return {
    getPokemons: () => dispatch(getPokemons()),
    getMorePokemons: i => dispatch(getMorePokemons(i)),
    searchPokemon: name => dispatch(searchPokemon(name))
  }
}

const renderPokemons = (pokemons, options) => {
  return pokemons.map((pokemon, i) => (
    <Pokemon {...pokemon} {...options} key={pokemon.id || i} />
  ));
}

export {
  my_pokemons,
  my_favorites_pokemons,
  mapStateToProps,
  mapDispatchToProps,
  renderPokemons
}