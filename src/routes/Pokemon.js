/* React */
import { Component } from 'react';

/* Components */
import Pokemon from '@pokemon/Card';
import Loading from '@dist/Loading';

/* Librarys */
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Thunks */
import { getPokemonProperties } from '@redux/thunks/getInfoPokemon';

/* JS */
import { isEmptyObject } from '@assets/js/typeof';

/* CSS */
import '@css/pokemon/styles.pokemon.css';

class Info_Pokemon extends Component {
  state = {
    pokemon: {}
  }
  componentDidMount() {
    const { pokemon } = this.props.match.params;
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    })
      .then(result => result.data)
      .then(pk => {
        axios({
          url: `https://pokeapi.co/api/v2/characteristic/${pk.id}`
        })
          .then(result => result.data.descriptions[2])
          .then(description => {
            if (pk.name === pokemon) {
              this.setState({ pokemon: { ...getPokemonProperties(pk), ...description } });
            } else {
              this.props.history.push('/pokemon-no-encontrado')
            }
          })
          .catch(() => {
            this.setState({ pokemon: getPokemonProperties(pk) });
          })
      })
      .catch(() => this.props.history.push('/pokemon-no-encontrado'))
  }

  render() {
    const isLoading = isEmptyObject(this.state.pokemon);
    // if () {
    //   return <p>maita</p>
    // }

    return (
      <div id="container-of-pokemon" className={isLoading ? '#' : this.state.pokemon.types[0]}>
        <Back />
        {
          isLoading
            ? <Loading />
            : (
              <Pokemon {...this.state.pokemon} showPokeballs={false} showTypes icon={null} showDescription showTabs />
            )
        }

      </div>
    );
  }
}

export default Info_Pokemon;

class Back extends Component {
  render() {
    return (
      <Link to="/" className="transparent icon-opacity pointer back-arrow">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" />
      </Link>
    )
  }
}
