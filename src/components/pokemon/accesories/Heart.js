/* React */
import { PureComponent } from 'react';

/* Librarys */
import { connect } from 'react-redux';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Reducers */
import {
  mapDispatchToProps,
  addFavoritePokemonFromStorage,
  deleteFavoritePokemonFromStorage
} from '@redux/reducers/pokemons/my_favorites_pokemons';

/* JS */
import { isArray } from '@assets/js/typeof';
import { getKey } from '@assets/js/localStorage';
import { POKEMON_TO_FAVORITES } from '@assets/js/keys';

const heartClass = 'transparent icon-opacity add-to-favorites pointer ';
const rubberBand = 'active animate__animated animate__rubberBand';
const jello = 'animate__animated animate__jello';

class Heart extends PureComponent {

  state = {
    pokemonIsAdded: false
  }
  
  componentDidMount() {
    const myFavoritesPokemons = getKey(POKEMON_TO_FAVORITES);
    if (isArray(myFavoritesPokemons)) {
      myFavoritesPokemons.forEach(pokemon => {
        if (pokemon === this.props.pokemon.name) {
          this.setState({ pokemonIsAdded: true });
        }
      });
    }
  }

  addPokemonToFavorites = () => {
    const { name } = this.props.pokemon;
    this.setState({ pokemonIsAdded: !this.state.pokemonIsAdded });
    if (!this.state.pokemonIsAdded) {
      addFavoritePokemonFromStorage(name);
      this.props.addPokemonToFavorites(this.props.pokemon);
    } else {
      deleteFavoritePokemonFromStorage(name);
      this.props.deletePokemonFromFavorites(name);
    }
  }

  render() {
    const { pokemonIsAdded } = this.state;
    const heart_title = `Añadir a ${this.props.pokemon.name} a mis pokemones favoritos`
    return (
      <button onClick={this.addPokemonToFavorites} className={pokemonIsAdded ? heartClass + rubberBand : heartClass + jello} title={heart_title}>
        <FontAwesomeIcon icon={pokemonIsAdded ? faHeart : farHeart} size='lg' />
      </button>
    )
  }
}

export default connect(null, mapDispatchToProps)(Heart);
