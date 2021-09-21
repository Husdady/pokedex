/* React */
import { Component } from 'react';

/* Librarys */
import { connect } from 'react-redux';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Reducers */
import { mapDispatchToProps, deleteFavoritePokemonFromStorage } from '@redux/reducers/pokemons/my_favorites_pokemons';

class Trash extends Component {

  confirm_message = `¿Estás seguro que deseas eliminar a ${this.props.pokemon} de tus pokemones favoritos?`;

  deletePokemon = () => {
    const { pokemon } = this.props;
    const user_response = window.confirm(this.confirm_message);
    if (user_response) {
      this.props.deletePokemonFromFavorites(pokemon);
      deleteFavoritePokemonFromStorage(pokemon);
    }
  };

  render() {
    return (
      <button onClick={this.deletePokemon} className="delete-pokemon transparent icon-opacity pointer">
        <FontAwesomeIcon icon={faTrashAlt} size='lg' />
      </button>
    )
  }
}

export default connect(null, mapDispatchToProps)(Trash);
