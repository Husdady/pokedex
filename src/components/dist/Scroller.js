/* React */
import { Component } from "react";

/* Librarys */
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { mapDispatchToProps } from "@redux/reducers/pokemons";

/* JS */
import { getKey } from '@assets/js/localStorage';
import { SEARCH_POKEMON } from '@assets/js/keys';

class Scroller extends Component {

  static defaultProps = {
    offset: 20,
    totalItems: 0
  }
  state = {
    offset: this.props.offset
  };

  fetchMoreData = () => {
    const value_pokemon_in_storage = getKey(SEARCH_POKEMON);
    const isEmptyValue = value_pokemon_in_storage?.length === 0;
    if (isEmptyValue || !value_pokemon_in_storage) {
      const i = this.state.offset;
      this.props.getMorePokemons(i);
      this.setState({ offset: i + this.props.offset });
    }
  };

  render() {
    const pk_storage = getKey(SEARCH_POKEMON);
    const hasMorePokemons = pk_storage?.length > 0 ? false : true;
    return (
      <InfiniteScroll
        dataLength={this.props.totalItems}
        next={this.fetchMoreData}
        hasMore={hasMorePokemons}
        loader={<LoadMore />}>
        {this.props.children}
      </InfiniteScroll>
    );
  }
}

export default connect(null, mapDispatchToProps)(Scroller);

const styles = {
  container: {
    marginTop: 30
  },
  loading: {
    marginRight: 10
  },
  text: {
    fontFamily: 'Lato, sans-serif'
  }
}

class LoadMore extends Component {
  render() {
    return (
      <div className="j-center" style={styles.container}>
        <div className="loading" style={styles.loading} />
        <span style={styles.text}>Cargando más pokemones...</span>
      </div>
    )
  }
}
