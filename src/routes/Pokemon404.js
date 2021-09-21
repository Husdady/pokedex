/* Librarys */
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

/* CSS */
import '@css/pokemon/styles.pokemon404.css';

const page404 = require('@assets/img/snorlax.gif').default;
const styleImg = {
  width: '25%',
  maxWidth: 350,
  minWidth: 300,
  height: 'auto',
  marginBottom: -10,
  objectFit: 'cover'
}

const styleHome = {
  marginRight: 10
}

const Page404 = () => {
  const history = useHistory();
  const handleGoToHome = () => history.push('/');
  return (
    <div className="tm-page404 text-center">
      <img src={page404} style={styleImg} alt="not-found-page" />
      <h1 className="error_404">404</h1>
      <h1 className="error_title">¡Te has encontrado con un Snorlax!</h1>
      <span className="error_description">Ups! Parece que este pokemon está tomando una siesta, por favor no lo vayas a despertar, es mejor que vayas por otro camino.</span>
      <button onClick={handleGoToHome} className="mt-3 py-2 px-4 pointer"><i className="fas fa-home" />
        <FontAwesomeIcon style={styleHome} size="lg" icon={faHome} />
        <span>Volver al inicio</span>
      </button>
    </div>
  );
}

export default Page404;