/* React */
import { Component } from 'react';

/* Components */
import Tabs from '@dist/Tabs';
import { Statistics, Moves, About } from './tabs.card';

/* CSS */
import '@css/pokemon/styles.pokemons.css';
import '@css/pokemon/styles.navbar.css';
import '@css/pokemon/styles.card.tabs.css';

const statistics = require('@assets/img/card.tabs/statistics.jpg').default;
const moves = require('@assets/img/card.tabs/statistics.webp').default;
const about = require('@assets/img/card.tabs/about.webp').default;

const img_style = {
  width: 45, height: 45, marginRight: 5
}

class CardTabs extends Component {
  constructor(props) {
    super(props);
    this.cardTabs = [
      {
        img: statistics,
        altImg: 'pokemons-statistics',
        label: 'Statistics',
        component: <Statistics pokemon={this.props.pokemon} showDescription />
      },
      {
        img: moves,
        altImg: 'pokemon-moves',
        label: 'Moves',
        component: <Moves items={this.props.pokemon.moves} />
      },
      {
        img: about,
        altImg: 'about-pokemon',
        label: 'About',
        component: <About specialAbilities={this.props.pokemon.specialAbilities} heldItems={this.props.pokemon.heldItems} all_locations={this.props.pokemon.all_locations} />
      }
    ]
  }
  render() {
    const cardTabs = this.cardTabs.map((tab, i) => (
      <div label={tab.label} key={i} component={tab.component}>
        <img src={tab.img} alt={tab.altImg} style={img_style} />
      </div>
    ));

    return (
      <div className="card-tabs">
        <Tabs>{cardTabs}</Tabs>
      </div>
    );
  }
}

export default CardTabs;
