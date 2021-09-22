import { Component } from 'react';

const logo = require('@assets/img/pokedex.webp').default;
const logo_style = {
  width: '25%',
  minWidth: window.innerWidth >= 768 ? 270 : 250,
  margin: 'auto'
}

export default class Logo extends Component {
  render() {
    return (
      <div className="logo" style={logo_style}>
        <img src={logo} alt="logo-pokedex" />
      </div>
    );
  }
}