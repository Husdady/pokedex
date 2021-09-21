/* React */
import { Component, Fragment } from 'react';

/* Components */
import Stats from '@pokemon/Stats';
import { Pokeballs } from '@pokemon/accesories';

class Statistics extends Component {
  render() {
    const { name, height, weight, stats, description } = this.props.pokemon;
    const { showPokeballs, showDescription } = this.props;
    return (
      <Fragment>
        { showPokeballs && <Pokeballs pokemon={this.props.pokemon} />}
        <div className="text-center">
          <h6 className="height">Height: {height}dm</h6>
          <h6 className="weight">Weight: {weight}hg</h6>
        </div>
        <h4 className="pokemon_name">{name}</h4>

        {showDescription && <h6 className="pokemon_description text-center">{description}</h6>}

        <Stats items={stats} />
      </Fragment>
    );
  }
}

export default Statistics;
