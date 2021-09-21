/* React */
import { Suspense, PureComponent } from 'react';

/* Components */
import { Empty } from '@dist';

/* Librarys */
import { connect } from 'react-redux';

/* Reducers */
import { renderPokemons } from '@redux/reducers/pokemons';
import { mapStateToProps } from '@redux/reducers/pokemons/my_pokemons';

/* JS */
import { isEmptyArray } from '@assets/js/typeof';

const title_for_empty_pokemons = "Aún no has capturado ningún pokemón. Para capturar un pokemón, ve a la sección de pokemones y busca al pokemón que desees capturar.";

const button_title_for_empty_pokemons = "Ir a la sección de pokemones";

class MyPokemons extends PureComponent {
  render() {
    const { pokemons } = this.props;
    const all_my_pokemons = renderPokemons(pokemons, {
      showPokeballs: false, editPokemon: true, shouldUpdate: true
    });
    if (isEmptyArray(pokemons)) {
      return (
        <Empty title={title_for_empty_pokemons} buttonTitle={button_title_for_empty_pokemons} goToSectionPokemons={this.props.goToSectionPokemons} />
      )
    }
    return (
      <div id="pokemons">
        <Suspense fallback={null}>
          {all_my_pokemons}
        </Suspense>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(MyPokemons);
