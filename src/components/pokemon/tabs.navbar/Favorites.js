/* React */
import { Component } from 'react';

/* Components */
import { Empty } from '@dist';

/* Librarys */
import { connect } from 'react-redux';

/* Reducers */
import { renderPokemons } from '@redux/reducers/pokemons';
import { mapStateToProps, mapDispatchToProps } from '@redux/reducers/pokemons/my_favorites_pokemons';

/* JS */
import { isEmptyArray } from '@assets/js/typeof';

const title_for_empty_pokemons = "Aún no has agregado ningún pokemón como favorito. Si tienes alguno, dale me encanta para que se añada en esta sección.";

const button_title_for_empty_pokemons = "Ir a la sección de pokemones";

class Favorites extends Component {
  render() {

    const { pokemons } = this.props;

    if (isEmptyArray(pokemons)) {
      return (
        <Empty title={title_for_empty_pokemons} buttonTitle={button_title_for_empty_pokemons} goToSectionPokemons={this.props.goToSectionPokemons} />
      )
    }

    const all_favorites_pokemons = renderPokemons(pokemons, {
      showPokeballs: false, editPokemon: false, icon: 'trash'
    });

    return (
      <div id="pokemons">{all_favorites_pokemons}</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
