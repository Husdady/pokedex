/* React */
import { Component } from 'react';

/* Librarys */
import { withRouter } from 'react-router-dom';

/* Components */
import CardTabs from './Card.Tabs';
import { Statistics } from './tabs.card';
import Image from '@elements/Image';
import { Heart, Trash, Edit, Leave, Types } from './accesories';

const renderIcon = (state, elements) => {
  switch (state) {
    case 'heart':
      return elements.heart
    case 'trash':
      return elements.trash
    default:
      return null
  }
}

class Card extends Component {

  static defaultProps = {
    icon: 'heart',
    showPokeballs: true,
    editPokemon: false,
    showTypes: false,
    showDescription: false,
    showTabs: false,
    shouldUpdate: false
  }

  icons = {
    heart: <Heart pokemon={this.props} />,
    trash: <Trash pokemon={this.props.name} />
  }

  showPokemonDetails = () => {
    const pokeUrl = `/${this.props.default_name}`
    this.props.history.push({
      pathname: pokeUrl,
      state: {
        currentPokemon: this.props.default_name
      }
    });
  }

  shouldComponentUpdate() {
    return this.props.shouldUpdate;
  }

  render() {
    const { id, name, img, icon, editPokemon, types, showTypes, showTabs } = this.props;
    const altImg = `pokemon-${name}`;
    const iconName = renderIcon(icon, this.icons);

    return (
      <div className="pokemon">

        {iconName}
        <div className="j-center">
          <Image title={name} onClick={this.showPokemonDetails} className="pokemon_img pointer" url={img} name={altImg} />
        </div>

        {showTypes && <Types items={types} />}

        {editPokemon && (
          <div className="optional-config">
            <Edit pokemon={name} pokemonId={id} />
            <Leave pokemon={name} pokemonId={id} />
          </div>
        )}

        {
          showTabs
            ? <CardTabs pokemon={this.props} />
            : (
              <Statistics
                pokemon={this.props}
                showPokeballs={this.props.showPokeballs}
                showDescription={this.props.showDescription}
              />
            )
        }
        
      </div>
    );
  }
}

const CardWithRouter = withRouter(Card);

export default CardWithRouter;
