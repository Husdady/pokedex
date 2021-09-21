import { Component } from 'react';
import '@css/styles.footer.css';

class Footer extends Component {
  render() { 
    return (
      <footer>
        <span>&copy;</span>
        Creado por <a href="https://github.com/Husdady" target="_blank" rel="noreferrer" id="author" className="pointer">Husdady</a></footer>
    );
  }
}
 
export default Footer;
