import { CAPTURE_POKEMON, LEAVE_POKEMON, RENAME_POKEMON } from '@redux/types';

const my_pokemons = (state = [], action) => {
  switch (action.type) {
    case CAPTURE_POKEMON:
      return [action.pokemon, ...state];
    case LEAVE_POKEMON:
      return deletePokemon(state, action.pokemonId);
    case RENAME_POKEMON:
      const pokemon_renamed = rename({
        state,
        pokemonId: action.pokemonId,
        new_pokemon_name: action.new_name
      });
      const pokemons_unchangeds = deletePokemon(state, action.pokemonId);
      return [...pokemon_renamed, ...pokemons_unchangeds];
    default:
      return state;
  }
}

const deletePokemon = (state, pokemonId) => state.filter(({ id }) => id !== pokemonId);

const rename = ({
  state, pokemonId, new_pokemon_name
}) => {
  const pokemon = [];
  let get_pokemon = state.find(({ id }) => id === pokemonId);
  const pokemon_renamed = { ...get_pokemon, name: new_pokemon_name }
  pokemon.push(pokemon_renamed);
  return pokemon;
}

const mapStateToProps = ({ my_pokemons }) => {
  return { pokemons: my_pokemons }
}

const mapDispatchToProps = dispatch => {
  return {
    leavePokemon: pokemonId => dispatch({ type: LEAVE_POKEMON, pokemonId }),
    capturePokemon: pokemon => dispatch({ type: CAPTURE_POKEMON, pokemon }),
    renamePokemon: (pokemonId, new_name) => dispatch({ type: RENAME_POKEMON, pokemonId, new_name })
  }
}

export default my_pokemons;

export { mapStateToProps, mapDispatchToProps }