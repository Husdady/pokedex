/* React */
import { Component, Fragment } from 'react';

/* Librarys */
import { connect } from 'react-redux';

/* Reducers */
import { mapDispatchToProps } from '@redux/reducers/pokemons/my_pokemons';

/* JS */
import probability from '@assets/js/probability';
import { CATCHED_POKEMON } from '@assets/js/keys';
import { getKey, setKey } from '@assets/js/localStorage';

/* CSS */
import '@css/pokemon/styles.modal.pokemon.css';

const pokeball = require('@assets/img/game/pokeball-animation.gif').default;
const opened_pokeball = require('@assets/img/game/opened-pokeball.webp').default;
const catched_pokeball = require('@assets/img/game/pokeball-catch-animation.gif').default;

const renderContent = (state, elements) => {
  switch (state) {
    case 'pokemon_is_catched':
      return elements.content_pokemon_catched
    case 'pokemon_is_not_catched':
      return elements.content_pokemon_not_catched
    case 'pokemon_already_catched':
      return elements.content_pokemon_already_catched
    default:
      return elements.default_content
  }
}

const default_state = {
  show: false,
  pokemon_state: null,
  current_pokeball: null
}

class Catch extends Component {

  constructor(props) {
    super(props);
    this.state = default_state;
    this.content = {
      content_pokemon_already_catched: <PokemonAlreadyCatched name={this.props.pokemon.name} pokemonImg={this.props.pokemon.img} />,
      content_pokemon_catched: <PokemonCatched name={this.props.pokemon.name} />,
      content_pokemon_not_catched: <PokemonNotCatched name={this.props.pokemon.name} />,
      default_content: <DefaultContent onClickPokeball={this.handleOpenPokeball} />,
    }
  }

  handleOpenPokeball = () => {
    let result = null;
    const { experience } = this.props.pokemon;
    switch (this.state.current_pokeball) {
      case 'pokeball':
        result = probability(.4, experience);
        break;
      case 'super_pokeball':
        result = probability(.6, experience);
        break;
      case 'ultra_pokeball':
        result = probability(.8, experience);
        break;
      default:
        break;
    }
    if (result) {
      const catched_pokemons = getKey(CATCHED_POKEMON);
      this.setState({ pokemon_state: 'pokemon_is_catched' });
      this.props.capturePokemon(this.props.pokemon);
      if (catched_pokemons) {
        setKey(CATCHED_POKEMON, [...catched_pokemons, this.props.pokemon.name]);
      } else {
        setKey(CATCHED_POKEMON, [this.props.pokemon.name]);
      }
    } else {
      this.setState({ pokemon_state: 'pokemon_is_not_catched' });
    }
  }

  openModal = pokeball => {
    const catched_pokemons = getKey(CATCHED_POKEMON);
    if (catched_pokemons) {
      const current_catched_pokemon = catched_pokemons.some(pokemon => pokemon === this.props.pokemon.name);
      if (current_catched_pokemon) {
        return this.setState({ show: true, pokemon_state: 'pokemon_already_catched' });
      }
    }
    this.setState({ show: true, current_pokeball: pokeball });
  }

  closeModal = () => this.setState(default_state);

  render() {

    const { show, pokemon_state } = this.state;
    const content = renderContent(pokemon_state, this.content)
    if (!show) {
      return null;
    }

    return (
      <div className="modal">
        <Close onClose={this.closeModal} />
        <div className="modal-content">{content}</div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(Catch);

class PokemonAlreadyCatched extends Component {
  render() {
    return (
      <Fragment>
        <img id="pokemon-already-catched" src={this.props.pokemonImg} className="m-auto animate__animated animate__pulse animate__infinite	infinite" alt="pokeball-isalready-catched" />
        <h3 className="animate__animated animate__shakeY message text-center">
          <span id="pk-name">{this.props.name}</span> ya ha sido atrapado!
        </h3>
      </Fragment>
    )
  }
}

class PokemonCatched extends Component {
  render() {
    return (
      <Fragment>
        <img src={catched_pokeball} className="m-auto animate__animated animate__zoomInDown catched-pokeball" alt="pokeball-animated-catched" />
        <h3 className="animate__animated animate__zoomInDown message message-catched-pokemon text-center">
          Has atrapado con éxito a <span id="pk-name">{this.props.name}</span>!, puedes ver el pokemón atrapado en la sección de Mis pokemones.
        </h3>
      </Fragment>
    )
  }
}

class PokemonNotCatched extends Component {
  render() {
    return (
      <Fragment>
        <img src={opened_pokeball} className="m-auto opened-pokeball" alt="pokeball-animated-not-catched" />
        <h3 className="animate__animated animate__fadeInUp message message-not-catched-pokemon text-center">
          No pudiste atrapar a <span id="pk-name">{this.props.name}</span>, el pokemón ha huido!
        </h3>
      </Fragment>
    )
  }
}

class DefaultContent extends Component {
  render() {
    return (
      <Fragment>
        <img onClick={this.props.onClickPokeball} src={pokeball} className="m-auto default-pokeball animate__animated animate__rollIn pointer" alt="default-pokeball" />
        <h3 className="animate__animated animate__fadeIn animate__infinite	infinite message default-message text-center">
          Toca la pokebola para ver si atrapaste al pokemón!
        </h3>
      </Fragment>
    )
  }
}

class Close extends Component {
  render() {
    return <button id="close_modal" onClick={this.props.onClose} className="pointer">X</button>
  }
}