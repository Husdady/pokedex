/* React */
import { Component } from 'react';

/* Librarys */
// import Pagination from 'react-router-pagination';

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
        {/* <Pagination totalPages={12} pageNumber={12} /> */}
      </div>
    );
  }
}

export default Home;