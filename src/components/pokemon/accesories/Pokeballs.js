import { Component, createRef } from 'react';
import CatchPokemon from '@pokemon/CatchPokemon';

/* Pokeballs */
const pokeball = require('@assets/img/pokeballs/pokeball.webp').default;
const super_pokeball = require('@assets/img/pokeballs/super_pokeball.webp').default;
const ultra_pokeball = require('@assets/img/pokeballs/ultra_pokeball.webp').default;

const all_pokeballs = [
  {
    name: 'pokeball',
    img: pokeball
  },
  {
    name: 'super_pokeball',
    img: super_pokeball
  },
  {
    name: 'ultra_pokeball',
    img: ultra_pokeball
  }
]

class Pokeballs extends Component {

  constructor(props) {
    super(props);
    this.catch = createRef();
  }

  showPokeball = pokeball => this.catch.current.openModal(pokeball);

  render() {
    const { name } = this.props.pokemon;
    const custom_title = `Capturar a ${name}`;
    const pokeballs = all_pokeballs.map(ball => {
      const onClickPokeball = () => this.showPokeball(ball.name);
      return (
        <button key={ball.name} className="pokeball pointer" title={custom_title} onClick={onClickPokeball}>
          <img src={ball.img} alt={ball.name} />
        </button>
      )
    })

    return (
      <div className="pokeballs">{pokeballs}<CatchPokemon pokemon={this.props.pokemon} ref={this.catch} /></div>
    );
  }
}

export default Pokeballs;
