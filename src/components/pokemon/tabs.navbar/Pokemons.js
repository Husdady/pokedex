/* React */
import { PureComponent, createRef } from 'react';

/* Components */
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

class Pokemons extends PureComponent {

  constructor(props) {
    super(props);
    this.refTimeout = createRef();
    this.offlineComponent = <Timeout ref={this.refTimeout} onReconnect={this.reconnecting} />
  }

  reconnecting = () => {
    this.refTimeout.current.showLoading();
    this.showPokemons();
    setTimeout(() => {
      this.refTimeout.current?.hideLoading()
    }, 10000);
  }

  showPokemons = () => {
    const value_pokemon_in_storage = getKey(SEARCH_POKEMON);
    const not_found_value = value_pokemon_in_storage === null;
    if (!not_found_value && not_found_value.length > 0) {
      return this.props.searchPokemon(value_pokemon_in_storage);
    } else {
      this.props.getPokemons();
    }
  }

  componentDidMount() {
    this.showPokemons();
  }

  render() {

    const { pokemons, error, loading } = this.props;
    if (isError(error)) {
      return this.offlineComponent;
    } else if (loading) {
      return <Loading />
    } else if (isEmptyArray(pokemons)) {
      return <Empty title="No se han encontraron pokemones que concuerden con la búsqueda..." renderButton={false} />
    }

    const all_pokemons = renderPokemons(pokemons);
    return (
      <div className="container">
        <div id="pokemons">{all_pokemons}</div>
      </div>
    )
  }
}

const LazyPokemons = trackWindowScroll(Pokemons);

export default connect(mapStateToProps, mapDispatchToProps)(LazyPokemons);
