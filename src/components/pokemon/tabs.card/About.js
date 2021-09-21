import { Component } from 'react';
import { isEmptyArray } from '@assets/js/typeof';

class About extends Component {
  render() {
    const { specialAbilities, heldItems, all_locations } = this.props;
    return (
      <div id="about-pokemon">
        <h5 className="title-about">Localización:</h5>
        <Section emptyItems="Su localización es un misterio..." items={all_locations} />
        <h5 className="title-about">Habilidades especiales:</h5>
        <Section emptyItems="No posee habilidades especiales" items={specialAbilities} />
        <h5 className="title-about">Items retenidos:</h5>
        <Section emptyItems="No posee items retenidos" items={heldItems} />
      </div>
    );
  }
}

export default About;

class Section extends Component {
  render() {
    const { items } = this.props;
    const all_items = items.map((item, i) => {
      const title_item = item.replace(/-/g, ' ');
      return <span key={i} className="item">{title_item}</span>
    })
    return (
        <div className="section">
          {
            isEmptyArray(all_items)
              ? (
                <span>{this.props.emptyItems}</span>
              )
              : all_items
          }
        </div>
    );
  }
}
