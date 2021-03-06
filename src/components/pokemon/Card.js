/* React */
import { Component, Fragment } from 'react';

/* Librarys */
import LazyLoad from 'react-lazy-load';
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
    shouldUpdate: false,
    defaultHeight: 485
  }

  icons = {
    heart: <Heart pokemon={this.props} />,
    trash: <Trash pokemon={this.props.name} />
  }

  showPokemonDetails = () => {
    const pk_name = this.props.name.replace(/\s/g, '-').toLowerCase();
    const pokeUrl = `/${pk_name}`;
    this.props.history.push(pokeUrl);
  }

  shouldComponentUpdate() {
    return this.props.shouldUpdate;
  }

  render() {
    const { id, order, name, img, icon, editPokemon, types, showTypes, showTabs, defaultHeight } = this.props;
    const altImg = `pokemon-${name}`;
    const iconName = renderIcon(icon, this.icons);

    return (
      <LazyLoad height={defaultHeight} className="pokemon">
        <Fragment>
        {iconName}
        <div className="j-center">
          <Image title={name} onClick={this.showPokemonDetails} className="pokemon_img pointer" url={img} name={altImg} />
        </div>

        <span className="pokemon_order">#{order}</span>

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
        </Fragment>
      </LazyLoad>
    );
  }
}

const CardWithRouter = withRouter(Card);

export default CardWithRouter;
