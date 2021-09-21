import { Component } from 'react';

const explosion = require('@assets/img/card.tabs/explosion-2.webp').default;
const img_style = {
  width: 20, height: 20, marginRight: 3
}

class Moves extends Component {
  constructor(props) {
    super(props);
    this.moves = this.props.items.map((move, i) => (
      <div className="align-center">
        <img src={explosion} alt="explosion" style={img_style} />
        <li className="pokemon-move">{move}</li>
      </div>
    ))
  }
  render() {
    return (
      <div id="pokemon-moves">
        <h5 className="title-moves">All pokemon skills:</h5>
        <ul id="moves">
          {this.moves}
        </ul>
      </div>
    );
  }
}

export default Moves;
