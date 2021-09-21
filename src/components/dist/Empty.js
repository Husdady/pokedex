import { Component } from 'react';
import '@css/pokemon/styles.empty.pokemons.css';

const pokeball = require('@assets/img/tabs/pokeball.png').default;

const pokeball_style = {
  width: 35, height: 35, marginRight: 15
}

class Empty extends Component {
  static defaultProps = {
    renderButton: true
  }
  render() {
    return (
      <div id="not-found-pokemons" className="j-center">
        <div className="content">
          <p className="title">{this.props.title}</p>
          {
            this.props.renderButton &&
            <button onClick={this.props.goToSectionPokemons} id="go-to-section" className="border-none pointer">
              <img src={pokeball} style={pokeball_style} alt="pokeball" />
              <span>{this.props.buttonTitle}</span>
            </button>
          }
        </div>
      </div >
    );
  }
}

export default Empty;
