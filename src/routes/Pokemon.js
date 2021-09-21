/* React */
import { Component } from 'react';

/* Components */
import CardPokemon from '@pokemon/Card';
import { Loading, Timeout } from '@dist';

/* Librarys */
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Thunks */
import { getPokemonProperties } from '@redux/thunks/getInfoPokemon';

/* JS */
import { isError, isEmptyObject } from '@assets/js/typeof';

/* CSS */
import '@css/pokemon/styles.pokemon.css';

class Pokemon extends Component {
  state = {
    pokemon: {},
    error: {}
  }

  getInfoPokemon = async () => {
    const { pokemon } = this.props.match.params;
    try {
      const { data } = await axios({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        timeout: 15000
      });
      const { name, id, location_area_encounters } = data;
      const promises = [
        location_area_encounters,
        `https://pokeapi.co/api/v2/characteristic/${id}`
      ] 
      const fetchUrls = promises.map(url => axios({ url, timeout: 15000 }));
      const [locations, descriptions] = await Promise.all(fetchUrls);
      const description = descriptions.data.descriptions[1];
      const all_locations = locations.data.map(({ location_area }) => location_area.name);
      if (name === pokemon) {
        this.setState({ pokemon: { ...getPokemonProperties(data), ...description, all_locations } });
      } else {
        this.props.history.push('/pokemon-no-encontrado');
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  componentDidMount() {
    this.getInfoPokemon();
  }

  render() {
    const { pokemon, error } = this.state;
    const isLoading = isEmptyObject(pokemon);
    return (
      <div id="container-of-pokemon" className={isLoading ? '#' : this.state.pokemon.types[0]}>
        <Back />
        {
          isError(error)
          ? <div className="container-timeout"><Timeout /></div>
          : isLoading
            ? <Loading />
            : (
              <CardPokemon {...pokemon} showPokeballs={false} showTypes icon={null} showDescription showTabs />
            )
        }
      </div>
    );
  }
}

export default Pokemon;

class Back extends Component {
  render() {
    return (
      <Link to="/" className="transparent icon-opacity pointer back-arrow">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" />
      </Link>
    )
  }
}
