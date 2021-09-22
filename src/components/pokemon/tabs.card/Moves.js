import { Component } from 'react';

const explosion = require('@assets/img/card.tabs/explosion.webp').default;
const img_style = {
  width: 20, height: 20, marginRight: 3
}

class Moves extends Component {
  constructor(props) {
    super(props);
    this.moves = this.props.items.map((move, i) => {
      const title_move = move.replace(/-/g, ' ');
      return (
        <div key={i} className="align-center">
          <img src={explosion} alt="explosion" style={img_style} />
          <li className="pokemon-move">{title_move}</li>
        </div>
      )
    })
  }
  render() {
    return (
      <div id="pokemon-moves">
        <h5 className="title-moves">Todos las habilidades del Pokemón:</h5>
        <ul id="moves">
          {this.moves}
        </ul>
      </div>
    );
  }
}

export default Moves;
