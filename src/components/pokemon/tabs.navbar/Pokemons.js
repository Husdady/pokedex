/* React */
import { Suspense, PureComponent, createRef } from 'react';

/* Components */
import { Loading, Timeout } from '@dist';

/* Librarys */
import { connect } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';

/* JS */
import { getKey } from '@assets/js/localStorage';
import { SEARCH_POKEMON } from '@assets/js/keys';
import { isError } from '@assets/js/typeof';

/* Reducers */
import { mapStateToProps, mapDispatchToProps, renderPokemons } from '@redux/reducers/pokemons';

/* CSS */
import '@css/pokemon/styles.pokemons.css';

// const errorTitle = 'Se produjo un error al obtener los datos del servidor. Por favor, verifica tu conexión a internet.'

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
    }
    this.props.getPokemons();
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
    }

    const all_pokemons = renderPokemons(pokemons);
    return (
      <div className="container">
        <Suspense fallback={<Loading />}>
          <div id="pokemons">{all_pokemons}</div>
        </Suspense>
      </div>
    )
  }
}

const LazyPokemons = trackWindowScroll(Pokemons);

export default connect(mapStateToProps, mapDispatchToProps)(LazyPokemons);
