/* React */
import { Component } from 'react';

/* Components */
import Navbar from '@pokemon/Navbar';
import { Logo, Search } from '@elements';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Logo />
        <Search />
        <Navbar />
      </div>
    );
  }
}

export default Home;
