import axios from 'axios';
import capitalize from '@assets/js/capitalize';

const getPokemonProperties = pokemon => {
  return {
    id: pokemon.id,
    img: pokemon.sprites.front_default,
    default_name: pokemon.name,
    name: capitalize(pokemon.name)[0],
    experience: pokemon.base_experience,
    order: pokemon.order,
    stats: pokemon.stats,
    moves: pokemon.moves.map(({ move }) => move.name),
    specialAbilities: pokemon.abilities.map(({ ability }) => ability.name),
    heldItems: pokemon.held_items.map(({ held_item }) => held_item.name),
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map(({ type }) => type.name)
  }
}

const getInfoPokemon = async pks => {
  try {
    const promises = pks.map(({ url }) => axios.get(url));
    const results = await Promise.all(promises);
    const pokemons = results.map(pk => pk.data);
    return pokemons.map(pk => getPokemonProperties(pk));
  } catch (error) {
    return error;
  }
}

export default getInfoPokemon;

export { getPokemonProperties }