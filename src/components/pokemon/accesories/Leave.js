/* React */
import { Component } from 'react';

/* Librarys */
import { connect } from 'react-redux';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Reducers */
import { mapDispatchToProps } from '@redux/reducers/pokemons/my_pokemons';

/* JS */
import { CATCHED_POKEMON } from '@assets/js/keys';
import { getKey, setKey } from '@assets/js/localStorage';

const leavePokemonFromStorage = pokemon => {
  const catched_pokemons = getKey(CATCHED_POKEMON);
  const abandoned_pokemon = catched_pokemons.filter(pk => pk !== pokemon);
  setKey(CATCHED_POKEMON, abandoned_pokemon);
}

class Leave extends Component {

  leavePokemon = () => {
    const { pokemon, pokemonId } = this.props;
    const confirm_message = `¿Estás seguro que deseas abandonar a ${pokemon}?`;
    const user_response = window.confirm(confirm_message);
    if (user_response) {
      leavePokemonFromStorage(pokemon);
      this.props.leavePokemon(pokemonId);
    }
  };

  render() { 
    const { pokemon } = this.props;
    const leave_title = `Abandonar a ${pokemon}`;
    return (
      <button title={leave_title} onClick={this.deletePokemon} className="transparent leave-pokemon icon-opacity pointer">
        <FontAwesomeIcon onClick={this.leavePokemon} icon={faLeaf} size='lg' />
      </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(Leave);
