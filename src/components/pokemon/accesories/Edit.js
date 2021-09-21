/* React */
import { Component } from 'react';

/* Librarys */
import { connect } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Reducers */
import { mapStateToProps, mapDispatchToProps } from '@redux/reducers/pokemons/my_pokemons';

class Edit extends Component {
  renamePokemon = () => {
    const { pokemon, pokemonId } = this.props;
    const new_pokemon_name = window.prompt(`Ingresa un nuevo nombre para ${pokemon}`, pokemon);
    const limit_name = new_pokemon_name?.length <= 20
    if (!new_pokemon_name) {
      return;
    } else if (new_pokemon_name !== null && limit_name) {
      this.props.renamePokemon(pokemonId, new_pokemon_name)
    } else {
      alert('El nombre que has ingresado es muy largo, a tu pokemón no le gustará ese nombre, dale un nombre más corto.');
    }
  }
  render() {
    const { pokemon } = this.props;
    const edit_title = `Renombrar a ${pokemon}`;
    return (
      <button title={edit_title} onClick={this.renamePokemon} className="transparent edit-pokemon icon-opacity pointer">
        <FontAwesomeIcon icon={faEdit} size='lg' />
      </button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);