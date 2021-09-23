/* React */
import { PureComponent } from 'react';

/* Components */
import Scroller from '@pokemon/Scroller';
import { Loading, Empty, Timeout } from '@dist';

/* Librarys */
import { connect } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';

/* JS */
import { isError, isEmptyArray } from '@assets/js/typeof';
import { getKey } from '@assets/js/localStorage';
import { SEARCH_POKEMON } from '@assets/js/keys';

/* Reducers */
import { mapStateToProps, mapDispatchToProps, renderPokemons } from '@redux/reducers/pokemons';

/* CSS */
import '@css/pokemon/styles.pokemons.css';

const empty_pokemons_style = {
  width: '80%',
  fontSize: '1.25rem'
}

class Pokemons extends PureComponent {

  showPokemons = () => {
    const value_pokemon_in_storage = getKey(SEARCH_POKEMON);
    if (value_pokemon_in_storage?.length > 0) {
      return this.props.searchPokemon(value_pokemon_in_storage);
    }
    this.props.getPokemons();
  }

  componentDidMount() {
    this.showPokemons();
  }

  render() {

    const { pokemons, error, loading } = this.props;
    const value_pokemon_in_storage = getKey(SEARCH_POKEMON);
    if (isError(error)) {
      return <Timeout onReconnect={this.showPokemons} />;
    } else if (loading) {
      return <Loading />
    } else if (value_pokemon_in_storage?.length > 0 && isEmptyArray(pokemons)) {
      return <Empty title="No se han encontraron pokemones que concuerden con la búsqueda..." renderButton={false} titleStyle={empty_pokemons_style} />
    }

    const all_pokemons = renderPokemons(pokemons);
    return (
      <Scroller totalItems={pokemons.length}>
        <div id="pokemons">{all_pokemons}</div>
      </Scroller>
    )
  }
}

const LazyPokemons = trackWindowScroll(Pokemons);

export default connect(mapStateToProps, mapDispatchToProps)(LazyPokemons);
