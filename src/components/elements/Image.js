import { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const defaultImage = require('@assets/img/who-is-that-pokemon.png').default;

class Image extends Component {
  render() {
    const { name, url } = this.props;
    return (
      <LazyLoadImage {...this.props} src={url} alt={name} effect="blur" afterLoad={this.loadImage} placeholderSrc={defaultImage} />
    )
  }
}

export default Image;
