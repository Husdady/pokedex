/* React */
import { Component, Fragment } from 'react';

/* Components */
import Stats from '@pokemon/Stats';
import { Pokeballs } from '@pokemon/accesories';

class Statistics extends Component {
  render() {
    const { name, height, weight, stats, description } = this.props.pokemon;
    const { showPokeballs, showDescription } = this.props;
    const pokemon_name = name.includes('mr')
      ? `${name.slice(0, 2)}.${name.slice(2)}`
      : name;
    return (
      <Fragment>
        { showPokeballs && <Pokeballs pokemon={this.props.pokemon} />}
        <div className="text-center">
          <h6 className="weight">Peso: {weight}hg</h6>
          <h6 className="height">Altura: {height}dm</h6>
        </div>
        <h4 className="pokemon_name">{pokemon_name}</h4>

        {showDescription && <h6 className="pokemon_description text-center">{description ?? '-'}</h6>}

        <Stats items={stats} />
      </Fragment>
    );
  }
}

export default Statistics;
