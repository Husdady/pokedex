/* React */
import { Component } from 'react';

/* Components */
import Stat from './accesories/Stat';

/* Stats */
const health = require('@assets/img/stats/health.webp').default;
const attack = require('@assets/img/stats/attack.webp').default;
const defense = require('@assets/img/stats/defense.webp').default;
const special_attack = require('@assets/img/stats/special-attack.webp').default;
const special_defense = require('@assets/img/stats/special-defense.webp').default;
const speed = require('@assets/img/stats/speed.webp').default;

const stats_icon = [
  {
    name: 'attack',
    title: 'Ataque',
    icon: attack
  },
  {
    name: 'defense',
    title: 'Defensa',
    icon: defense
  },
  {
    name: 'hp',
    custom_name: 'health',
    title: 'Salud',
    icon: health
  },
  {
    name: 'speed',
    title: 'Velocidad',
    icon: speed
  },
  {
    name: 'special-attack',
    title: 'Ataque especial',
    icon: special_attack
  },
  {
    name: 'special-defense',
    title: 'Defensa especial',
    icon: special_defense
  }
]

const default_order = [2, 0, 1, 4, 5, 3];

const changeOrderStats = stats => {
  const order = [];
  stats.forEach((element, i) => {
    order[default_order[i]] = element
  });
  return order;
}

const orderStats = stats => stats.reduce((acc, all_stats, i) => {
  acc?.find(item => item.custom_name && delete item.custom_name);
  return [...acc, { ...all_stats, ...stats_icon[i] }]
}, []);

class Stats extends Component {

  render() {
    const filterOrderByStat = changeOrderStats(this.props.items);
    const orderedStats = orderStats(filterOrderByStat);
    const all_stats = orderedStats.map(item => (
      <Stat key={item?.stat?.name} name={item?.stat?.name} title={item.title} icon={item.icon} value={item.base_stat} />
    ));

    return (
      <div className="stats">{all_stats}</div>
    );
  }
}

export default Stats;