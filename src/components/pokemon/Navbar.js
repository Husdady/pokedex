/* React */
import { Component, createRef } from 'react';

/* Components */
import Tabs from '@dist/Tabs';

/* Tabs */
import { Pokemons, MyPokemons, Favorites } from './tabs.navbar';

/* CSS */
import '@css/pokemon/styles.navbar.css';

const pokeball = require('@assets/img/tabs/pokeball.webp').default;
const pikachu = require('@assets/img/tabs/pikachu.webp').default;
const favorite = require('@assets/img/tabs/favorite.webp').default;

const img_style = {
  width: 30, height: 30, marginRight: 5
}

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.refNavbar = createRef();
    this.tabs = [
      {
        img: pokeball,
        altImg: 'pokemons-tab',
        title: 'Pokemones',
        label: 'Pokemons',
        component: <Pokemons />
      },
      {
        img: pikachu,
        altImg: 'my-pokemons-tab',
        title: 'Mis Pokemones',
        label: 'My Pokemons',
        component: <MyPokemons goToSectionPokemons={this.goToSectionPokemons} />
      },
      {
        img: favorite,
        altImg: 'favorites-pokemons-tab',
        title: 'Mis Pokemones favoritos',
        label: 'Favorites Pokemons',
        component: <Favorites goToSectionPokemons={this.goToSectionPokemons} />
      }
    ]
  }
  goToSectionPokemons = () => this.refNavbar.current.handleShowContentTab('Pokemons')
  render() {
    const tabs = this.tabs.map((tab, i) => (
      <div label={tab.label} key={i} component={tab.component}>
        <div className="tab-label">
        <img src={tab.img} alt={tab.altImg} style={img_style} />
        <b className="tab-item-title">{tab.title}</b>
        </div>
      </div>
    ))
    return (
      <div className="navbar">
        <Tabs ref={this.refNavbar} keepChanges>{tabs}</Tabs>
      </div>
    );
  }
}