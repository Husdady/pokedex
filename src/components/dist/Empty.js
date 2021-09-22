import { Component } from 'react';
import '@css/pokemon/styles.empty.pokemons.css';

const pokeball = require('@assets/img/tabs/pokeball.webp').default;

const pokeball_style = {
  width: 35, height: 35, marginRight: 15
}

class Empty extends Component {
  static defaultProps = {
    renderButton: true
  }
  render() {
    const { title, titleStyle, buttonTitle, renderButton, goToSectionPokemons } = this.props;
    return (
      <div id="not-found-pokemons" className="j-center">
        <div className="content">
          <p className="title" style={titleStyle}>{title}</p>
          {
            renderButton &&
            <button onClick={goToSectionPokemons} id="go-to-section" className="border-none pointer">
              <img src={pokeball} style={pokeball_style} alt="pokeball" />
              <span>{buttonTitle}</span>
            </button>
          }
        </div>
      </div >
    );
  }
}

export default Empty;
