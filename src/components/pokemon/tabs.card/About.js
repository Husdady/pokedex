import { Component } from 'react';
import { isArray, isEmptyArray } from '@assets/js/typeof';

const item = require('@assets/img/card.tabs/item.webp').default;
const location = require('@assets/img/card.tabs/location.webp').default;
const special_ability = require('@assets/img/card.tabs/special-ability.webp').default;

const styles = {
  section: {
    marginTop: 20,
    textAlign: 'center'
  },
  icon: {
    width: 25,
  height: 25,
  marginRight: 7
  }
}

class About extends Component {
  render() {
    const { specialAbilities, heldItems, all_locations } = this.props;
    return (
      <div id="about-pokemon">
        <h5 className="title-about">Localización:</h5>
        <Section icon={location} emptyItems="Su localización es un misterio..." items={all_locations} />
        <h5 className="title-about">Habilidades especiales:</h5>
        <Section icon={special_ability} emptyItems="No posee habilidades especiales" items={specialAbilities} />
        <h5 className="title-about">Items retenidos:</h5>
        <Section icon={item} emptyItems="No posee items retenidos" items={heldItems} />
      </div>
    );
  }
}

export default About;

class Section extends Component {
  render() {
    const { items } = this.props;
    const all_items = isArray(items) && items.map((item, i) => {
      const title_item = item.replace(/-/g, ' ');
      return (
        <div key={i} className="j-center">
          <img src={this.props.icon} alt={item} style={styles.icon} />
          <span className="item">{title_item}</span>
        </div>
      )
    })
    return (
        <div className="section" style={styles.section}>
          {
            !all_items || isEmptyArray(all_items) 
              ? <span>{this.props.emptyItems}</span>
              : all_items
          }
        </div>
    );
  }
}
