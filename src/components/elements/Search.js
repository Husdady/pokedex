/* React */
import { Component } from 'react';

/* Librarys */
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

/* Reducers */
import { mapDispatchToProps } from '@redux/reducers/pokemons';

/* JS */
import { SEARCH_POKEMON } from '@assets/js/keys';
import { getKey, setKey } from '@assets/js/localStorage';
import { isEmptyArray } from '@assets/js/typeof';

/* CSS */
import '@css/styles.search.css';

class Search extends Component {

  state = {
    pokemon: ''
  }

  componentDidMount() {
    const pokemon_saved_in_search = getKey(SEARCH_POKEMON);
    if (pokemon_saved_in_search) {
      this.setState({ pokemon: pokemon_saved_in_search });
    }
  }

  handleSearchPokemon = e => {
    e.preventDefault();
    const pk = this.state.pokemon.toLocaleLowerCase().trim();
    const pokemon_saved_in_search = getKey(SEARCH_POKEMON);
    if (pk.length > 0 && (pokemon_saved_in_search !== pk)) {
      this.props.searchPokemon(pk);
    } else if (pk.length === 0) {
      this.props.getPokemons();
    }
    setKey(SEARCH_POKEMON, pk);
  }

  handleChange = e => this.setState({ pokemon: e.target.value });
  
  render() {
    const button_disabled = isEmptyArray(this.props.all_pokemons);
    return (
      <div id="search">
        <form onSubmit={this.handleSearchPokemon}>
          <input value={this.state.pokemon} onChange={this.handleChange} id="search_field" type="text" placeholder="Buscar pokemón..." />
          <button id="search_button" className="pointer" disabled={button_disabled} type="submit">
            <FontAwesomeIcon icon={faSearch} color="#312d98" />
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ pokemons, loading }) => {
  return {
    loading,
    all_pokemons: pokemons.all,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
